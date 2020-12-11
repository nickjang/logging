import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import ProjectTitles from '../../Components/Viewer/ProjectTitles/ProjectTitles';
import Formatter from '../../Components/Formatter/Formatter';
import LogList from '../../Components/LogList/LogList';
import SideBar from '../../Components/Viewer/SideBar/SideBar';
import SelectorContext from '../../Context/SelectorContext';
import { sortSelectors, mostRecentDay } from '../../Components/Utils/selector-helper-functions';
import { updateListWithUpdatedLogs } from '../../Components/Utils/format-helper-functions';
import LoggingApiService from '../../services/logging-api-service';
import './View.css';

class View extends Component {
  state = {
    projects: [],
    dayRanges: {},
    selectors: {},
    selectedLogs: [], // logs fetched with selectors
    format: {
      min: 0,
      sec: 0,
      touched: false
    },
    formattedSelectors: {}, // titles to display after fetching logs
    logListSelectedIds: [], // ids of logs selected in displayed log list
    loading: '',
    error: ''
  };


  /*************** UI Selector Functions ***************/


  /**
   * Validate a selector's type.
   */
  validateSelectorType = (selector) => {
    return !['project', 'years', 'months', 'days'].includes(selector.type);
  }

  /**
   * Get a selector's index in a project's
   * list of selectors.
   */
  getSelectorIndex = (projectId, selectorId) => {
    if (projectId == null)
      throw new Error('Given undefined or null project id')
    if (!selectorId)
      throw new Error('Given undefined or null selector id')

    // get the index of the target selector
    const selectorIdx = this.state.selectors[projectId].findIndex(selector =>
      selector.id === selectorId
    );

    if (selectorIdx < 0)
      throw new Error('Selector does not exist')

    return selectorIdx;
  }

  /**
   * Add a selector to a project.
   */
  addSelector = (projectId, type) => {
    const newSelector = {
      id: uuidv4(),
      type,
      calendar: { value: null },
      endRange: { added: false, value: null }
    };

    if (projectId == null)
      throw new Error('Given undefined or null project id.')
    if (this.validateSelectorType(newSelector)) {
      throw new Error('Selector must be one of \'project\', '
        + '\'years\', \'months\', or \'days\'.')
    }

    const selectors = { ...this.state.selectors };
    selectors[projectId].push(newSelector);
    this.setState({ selectors })
  }

  /**
   * Add an end range to a project's selector.
   */
  addEndRange = (projectId, selectorId) => {
    const selectorIdx = this.getSelectorIndex(projectId, selectorId);
    let selectors = { ...this.state.selectors };

    // add end range to target selector
    selectors[projectId][selectorIdx].endRange = {
      added: true,
      value: null
    };

    this.setState({ selectors });
  }

  /**
   * Delete a project's selector.
   */
  deleteSelector = (projectId, selectorId) => {
    const selectorIdx = this.getSelectorIndex(projectId, selectorId);
    let selectors = { ...this.state.selectors };

    // delete target selector
    selectors[projectId].splice(selectorIdx, 1);

    this.setState({ selectors });
  }

  /**
   * Update the start or end of a project's selector.
   */
  updateSelector = (projectId, selectorId, isStart, value) => {
    const selectorIdx = this.getSelectorIndex(projectId, selectorId);
    let selectors = { ...this.state.selectors };

    // update start or end
    if (isStart)
      selectors[projectId][selectorIdx].calendar.value = value;
    else
      selectors[projectId][selectorIdx].endRange.value = value;

    this.setState({ selectors });
  }

  /**
   * Delete all selectors;
   */
  resetSelectors = () => {
    let selectors = { ...this.state.selectors };
    for (const projectId in selectors)
      selectors[projectId] = [];

    this.setState({ selectors });
  }


  /***************** Process Selectors *****************/


  /**
   * Format a selector to have start and end
   * ranges in MM-DD-YYYY format. 
   */
  formatSelector = (selector) => {
    let start = new Date(selector.calendar.value);
    let end = selector.endRange.value || selector.calendar.value;
    end = new Date(end);

    // adjust to start and end of year/month/day
    if (selector.type === 'years') {
      start.setMonth('00');
      start.setDate('01');
      end.setFullYear(end.getFullYear() + 1);
      end.setMonth('00');
      end.setDate('01')
    } else if (selector.type === 'months') {
      start.setDate('01');
      end.setMonth(end.getMonth() + 1);
      end.setDate('01')
    } else {
      end.setDate(end.getDate() + 1);
    }  
    return [start, end];
  }

  /**
   * Format selectors to have a start and end 
   * range as Date values, or format to 
   * select the entire project. Given an array 
   * of projects and their selectors.
   */
  formatSelectors = (selectors) => {
    let formatted = [];

    for (let i = 0; i < selectors.length; i++) {
      let selector = selectors[i];

      if (!selector) throw new Error('Given invalid selector.');
      // don't need the other selectors if selecting the entire project
      else if (selector.type === 'project') return ['project'];
      // skip if selector is not used
      else if (!selector.calendar.value) continue;

      // call helper function to format
      selector = this.formatSelector(selector);
      formatted.push(selector);
    };

    return formatted;
  }

  /**
   * Combine ranges of dates, so they don't 
   * overlap.
   */
  mergeSelectors = (selectors) => {
    let mergedSelectors = [];
    let idx1 = 0;
    let idx2 = 1;

    // sort selectors of project by their start days in ascending order
    sortSelectors(selectors);

    if (selectors.length === 1) return selectors;

    // merge selectors or selector add to the new selector list
    while (idx2 < selectors.length) {
      // compare end of first selector to start of second
      if (selectors[idx1][1] < selectors[idx2][0]) {
        mergedSelectors.push(selectors[idx1]);
        idx1 = idx2;
        idx2++;
      } else {
        selectors[idx1][1] =
          mostRecentDay(selectors[idx1][1], selectors[idx2][1]);
        idx2++;
      }
      // if the loop is ending, push the last range 
      // or the range merged with the last range
      if (idx2 >= selectors.length)
        mergedSelectors.push(selectors[idx1]);
    }
    return mergedSelectors;
  }

  /**
   * Given a dictionary of project ids to 
   * selectors, prepare each list of selectors
   * to send to server and fetch logs.
   */
  prepareSelectors = (selectorDictionary) => {
    let newDictionary = {};
    for (const projectId in selectorDictionary) {
      let selectors;

      // don't add to new dictionary if project has no selectors
      if (!selectorDictionary[projectId].length) continue;

      // format project's selectors // only selectors with values are kept
      selectors = this.formatSelectors(selectorDictionary[projectId]);
      // don't add to new dictionary if selectors have no values
      if (!selectors.length) continue;
      else newDictionary[projectId] = selectors;

      // if selecting the entire project, the project's selectors 
      // are finished getting prepared
      if (newDictionary[projectId][0] === 'project') continue;

      // then merge project's selectors
      newDictionary[projectId] =
        this.mergeSelectors(newDictionary[projectId]);

      // and convert to ISO strings
      newDictionary[projectId] = newDictionary[projectId].map(selector =>
        [selector[0].toISOString(), selector[1].toISOString()]
      );
    }
    return newDictionary;
  }


  /******************** Fetch Logs *********************/


  /**
   * Get logs filtered by selectors.
   */
  fetchLogs = () => {
    const selectors = this.prepareSelectors(this.state.selectors);
    const projectIds = Object.keys(selectors);
    if (!projectIds.length)
      throw new Error('Could not get logs because no selections were made');
    return LoggingApiService.getLogsBySelectors(selectors)
      .then(selectedLogs => {
        // a dictionary to check if selected projects, returned logs
        let visitedProjectIds = {};
        projectIds.forEach(id => visitedProjectIds[id] = false);

        selectedLogs = selectedLogs.map(log => {
          // check if logs are from selected projects
          if (selectors[log.project_id])
            visitedProjectIds[log.project_id] = true;
          else
            throw new Error('Got back logs from projects that weren\'t selected');

          return {
            id: log.id,
            project_id: log.project_id,
            start_time: log.start_time,
            end_time: log.end_time,
            format: log.format
          };
        });

        // delete selected projects that returned no logs
        for (const projectId in visitedProjectIds) {
          if (visitedProjectIds[projectId] === false)
            delete selectors[projectId];
        }
        this.setState({ selectedLogs, formattedSelectors: selectors });
      });
  }


  /******************** Format Logs ********************/

  updateLogListSelectedOptions = (ids) => {
    this.setState({ logListSelectedIds: ids });
  }

  updateFormats = (minutes, seconds) => {
    return LoggingApiService.updateLogsWithFormat(
      this.state.logListSelectedIds,
      minutes,
      seconds
    )
      .then(updatedLogs => {
        // update logs in state
        let selectedLogs = [...this.state.selectedLogs];

        selectedLogs = updateListWithUpdatedLogs(
          selectedLogs, updatedLogs
        );

        this.setState({ selectedLogs });
      });
  }


  /*****************************************************/


  componentDidMount() {
    this.setState(
      {
        loading: 'Loading projects...',
        error: ''
      },
      () => {
        Promise.all([
          LoggingApiService.getProjects(),
          LoggingApiService.getDayRanges()
        ])
          .then(([projects, dayRanges]) => {
            // filter data from projects
            projects = projects.map(project => {
              return {
                id: project.id,
                title: project.title,
                date_created: project.date_created
              };
            })

            // convert dayRanges to use moment objects because 
            // the Datetime picker uses moment
            for (let projectId in dayRanges) {
              dayRanges[projectId] = dayRanges[projectId].map(range =>
                [moment(range[0]), moment(range[1]).subtract(1, 'milliseconds')]
              );
            }

            // initialize selectors
            let selectors = {};
            projects.forEach(project => selectors[project.id] = []);

            this.setState({
              projects,
              selectors,
              dayRanges,
              loading: ''
            });
          })
          .catch(e => this.setState({ loading: '', error: e.error }));
      }
    )
  }

  render() {
    let contextValue = {
      projects: this.state.projects,
      selectors: this.state.selectors,
      dayRanges: this.state.dayRanges,
      addSelector: this.addSelector,
      addEndRange: this.addEndRange,
      deleteSelector: this.deleteSelector,
      updateSelector: this.updateSelector,
      resetSelectors: this.resetSelectors
    }

    return (
      <SelectorContext.Provider value={contextValue}>
        <div className='view-page'>
          <SideBar fetchLogs={this.fetchLogs} />
          <div className='view-wrapper'>
            <article className='view-main'>
              <span
                className={`status ${this.state.error ? 'fail-status' : ''}`}
              > {this.state.error || this.state.loading}
              </span>
              <ProjectTitles selectors={this.state.formattedSelectors} />
              <Formatter
                listHasLogs={!!this.state.logListSelectedIds.length}
                updateFormats={this.updateFormats} />
              <LogList
                logs={this.state.selectedLogs}
                updateSelected={this.updateLogListSelectedOptions} />
            </article>
          </div>
        </div>
      </SelectorContext.Provider>
    );
  }
}

export default View;