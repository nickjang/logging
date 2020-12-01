import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import ProjectTitles from '../../Components/Viewer/ProjectTitles/ProjectTitles';
import Formatter from '../../Components/Formatter/Formatter';
import Exporter from '../../Components/Viewer/Exporter/Exporter';
import LogList from '../../Components/LogList/LogList';
import SideBar from '../../Components/Viewer/SideBar/SideBar';
import SelectorContext from '../../Context/SelectorContext';
import { sortSelectors, mostRecentDay } from './selector-helper-functions';
import formatLog from '../../Components/Formatter/formatLog';
import LoggingApiService from '../../services/logging-api-service';
import './View.css';

// set up error boundary for log list, and fetch

class View extends Component {
  state = {
    //currentProjects: {},
    projects: [],
    dayRanges: {},
    //logs: [], //sorted by start time //add logs on addSelector, deactivate days there are no logs
    selectors: {},
    //selectedLogIds: [],
    selectedLogs: [],
    format: {
      min: 0,
      sec: 0,
      touched: false
    },
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
      throw new Error('Given undefined or null projectId')
    if (!selectorId)
      throw new Error('Given undefined or null selectorId')

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
      calendar: { value: '', open: false },
      endRange: { added: false, value: '', open: false }
    };

    if (projectId == null)
      throw new Error('Given undefined or null projectId.')
    if (this.validateSelectorType(newSelector)) {
      throw new Error('Selector must be one of \'project\', '
        + '\'years\', \'months\', or \'days\'.')
    }

    // make sure projectId is a String before adding to object
    projectId = String(projectId);
    const selectors = { ...this.state.selectors };
    selectors[projectId] = [
      ...this.state.selectors[projectId],
      newSelector
    ];
    this.setState({ selectors })
  }

  /**
   * Add an end range to a project's selector.
   */
  addEndRange = (projectId, selectorId) => {
    const selectorIdx = this.getSelectorIndex(projectId, selectorId);
    let projectSelectors = [...this.state.selectors[projectId]];

    // add end range to target selector
    projectSelectors[selectorIdx] = {
      ...projectSelectors[selectorIdx],
      endRange: {
        added: true,
        value: '',
        open: true
      }
    }

    // make sure projectId is a String before adding to object
    projectId = String(projectId);
    const selectors = { ...this.state.selectors };
    selectors[projectId] = projectSelectors;
    this.setState({ selectors });
  }

  /**
   * Delete a project's selector.
   */
  deleteSelector = (projectId, selectorId) => {
    const selectorIdx = this.getSelectorIndex(projectId, selectorId);
    let projectSelectors = [...this.state.selectors[projectId]];

    // delete target selector
    projectSelectors.splice(selectorIdx, 1);

    projectId = String(projectId);
    const selectors = { ...this.state.selectors };
    selectors[projectId] = projectSelectors;
    this.setState({ selectors });
  }


  /***************** Process Selectors *****************/


  /**
   * Format a selector to have start and end
   * ranges in MM-DD-YYYY format. 
   */
  formatSelector = (selector) => {
    const monthDays = {
      '01': '31', '02': '29', '03': '31', '04': '30',
      '05': '31', '06': '30', '07': '31', '08': '31',
      '09': '30', '10': '31', '11': '30', '12': '31'
    }
    let start = selector.calendar.value; //should these be dates to begin with??????????????????????????????????????????????????????????????????
    let end = selector.endRange.added
      ? selector.endRange.value
      : selector.calendar.value;

    if (selector.type === 'years') {
      start = new Date(start);
      end = new Date(`${end}-12-31T23:59:59.999Z`);
    } else if (selector.type === 'months') {
      start = start.split('-');
      end = end.split('-');
      start = new Date(`${start[1]}-${start[0]}-01T00:00:00.000Z`);
      end = new Date(`${end[1]}-${end[0]}-${monthDays[end[0]]}T23:59:59.999Z`);
    } else {
      start = new Date(start);
      end = end.split('-');
      end = new Date(`${end[2]}-${end[1]}-${end[0]}T23:59:59.999Z`);
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
      if (selector.type === 'project') return ['project'];

      // call helper function to format
      selector = this.formatSelector(selector);
      formatted.push(selector);
    };

    // sort selectors of project by their start days in ascending order
    sortSelectors(formatted);

    return formatted;
  }

  /**
   * Combine ranges of dates, so they don't 
   * overlap.
   */
  mergeSelectors = (selectors) => {
    let newSelectors = [];
    let idx1 = 0;
    let idx2 = 0;

    // if 'project' selector exists, it is the only selector
    if (selectors[idx1] === 'project') {
      return selectors;
    }

    // merge selectors or add to the new selector list
    while (idx2 < selectors.length) {
      // compare end of first selector to start of second
      if (selectors[idx1][1] < selectors[idx2][0]) {
        newSelectors.push(selectors[idx1]);
        idx1++;
        idx2++;
      } else {
        selectors[idx1][1] =
          mostRecentDay(selectors[idx1][1], selectors[idx2][1]);
        idx2++;
      }
    }
    return newSelectors;
  }

  /**
   * Given a dictionary of project ids to 
   * selectors, prepare each list of selectors
   * to send to server and fetch logs.
   */
  prepareSelectors = (selectorDictionary) => {
    let newDictionary = {};
    for (const projectId in selectorDictionary) {
      // format project's selectors
      newDictionary[projectId] =
        this.formatSelectors(selectorDictionary[projectId]);
      // then merge project's selectors
      newDictionary[projectId] =
        this.mergeSelectors(newDictionary[projectId]);
    }
    return newDictionary;
  }


  /******************** Fetch Logs *********************/


  /**
   * Get ids of logs filtered by selectors.
   * Logs and selectors are grouped by project.
   */
  // Change to call merge selectors, separate merge 
  // selectors to do for one project. Combine merge 
  // and format selectors functions.
  // Fetch
  getSelectedIds = (selectorsByProject, logsByProject) => {
    let selectedLogIds = [];
    for (const projectId in selectorsByProject) {
      const currLogs = logsByProject[projectId];
      const currSelectors = selectorsByProject[projectId];
      let idx1 = 0, idx2 = 0;
      let start = new Date(currSelectors[idx1].start);
      let end = new Date(currSelectors[idx1].end);
      while (idx2 < currLogs.length) {
        if (currLogs[idx2] >= start && currLogs[idx2] <= end) {
          selectedLogIds.push(currLogs[idx2].id);
        } else {
          idx1++;
          idx2++;
        }
      }
    };
    this.setState({ selectedLogIds });
  }


  /******************** Format Logs ********************/


  /**
   * Update format for logs
   */
  updateLogListFormat = (type, num) => {
    let { min, sec } = this.state.format;

    num = parseInt(num);
    if (type === 'min') min = num;
    else if (type === 'sec') sec = num;
    this.setState({ format: { min, sec, touched: true } });
  }

  /**
   * Apply format to logs
   */
  formatLogList = (logs) => {
    return logs; //put this function in Formatter/formatLog?
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
            console.log('projects', projects, 'day ranges', dayRanges);
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
                [moment(range[0]), moment(range[1])]
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
          .catch(e => this.setState({ loading: '', error: e.message || e.error }));
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
      deleteSelector: this.deleteSelector
    }

    return (
      <SelectorContext.Provider value={contextValue}>
        <div className='view-page'>
          <SideBar viewLogs={this.updateSelectedLogIds} />
          <div className='view-wrapper'>
            <article className='view-main'>
              <span className='status'>{this.state.error || this.state.loading}</span>
              <ProjectTitles
                selectors={this.state.selectors}
                projects={this.state.currentProjects} />
              <Formatter
                format={this.state.format}
                updateFormat={this.updateLogListFormat}
                formatLogList={this.formatLogList} />
              <Exporter />
              <LogList logs={this.state.selectedLogs} />
            </article>
          </div>
        </div>
      </SelectorContext.Provider>
    );
  }
}

export default View;