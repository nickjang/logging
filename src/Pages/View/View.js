import React, { Component } from 'react';
import ProjectTitles from '../../Components/Viewer/ProjectTitles/ProjectTitles';
import Formatter from '../../Components/Formatter/Formatter';
import Exporter from '../../Components/Viewer/Exporter/Exporter';
import LogList from '../../Components/LogList/LogList';
import SideBar from '../../Components/Viewer/SideBar/SideBar';
import formatLog from '../../Components/Formatter/formatLog';
import './View.css';

// context -- project list
// don't use moment?
// set up error boundary for log list, and fetch?

class View extends Component {
  state = {
    currentProjects: { 'example-project-id': { name: 'example', logIds: [] } },
    logs: [
      { id: 'example-log-id1', start: '10-27-2020 12:00:00', end: '10-27-2020 14:00:00' },
      { id: 'example-log-id2', start: '10-27-2020 12:00:00', end: '10-27-2020 14:00:00' },
      { id: 'example-log-id3', start: '10-27-2020 12:00:00', end: '10-27-2020 14:00:00' }
    ], //sorted by start time //add logs on addSelector, deactivate days there are no logs
    selectors: [
      {
        projectId: 'example-project-id',
        selectors: [
          {
            id: '',
            type: 'day',
            calendar: { value: '00-00-0000', open: false },
            endRange: { value: '', open: false }
          }
        ]
      }
    ],
    selectedLogIds: [],
    format: {
      min: 0,
      sec: 0,
      touched: false
    }
  };

  /**
   * Update current projects with selectors
   * to get logs from.
   */
  updateCurrentProjects = () => {

  }

  /**
   * Update logs of current projects.
   */
  updateLogs = () => {

  }

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

  /**
   * Validate the selector's type.
   */
  validateSelector = (selector) => {
    return !['project', 'year', 'month', 'day'].includes(selector.type);
  }

  /**
   * Sort selectors of project by their start 
   * days in ascending order
   */
  sortSelectors = (selectors) => {
    selectors.sort((selector1, selector2) => {
      if (selector1[0] > selector2[0]) return 1;
      else if (selector1[0] === selector2[0]) return 0;
      return -1;
    });
  }

  /**
   * Format a selector to have start and end
   * range in MM-DD-YYYY format. 
   */
  formatSelector = (selector) => {
    const monthDays = {
      '01': '31', '02': '29', '03': '31', '04': '30',
      '05': '31', '06': '30', '07': '31', '08': '31',
      '09': '30', '10': '31', '11': '30', '12': '31'
    }
    let start = selector.calendar.value;
    let end = selector.endRange.value || selector.calendar.value;

    if (selector.type === 'year') {
      start = `$01-01-${start}`;
      end = `12-31-${end}`;
    } else if (selector.type === 'month') {
      start = start.split('-');
      end = end.split('-');
      start = `${start[0]}-01-${start[1]}`;
      end = `${end[0]}-${monthDays.end[0]}-${end[1]}`;
    }
    return { start, end };
  }

  /**
   * Format selectors to have a start and end 
   * range in MM-DD-YYYY format, or format to 
   * select the entire project. Given an array 
   * of projects and their selectors.
   */
  formatSelectors = (selectorsByProject) => {
    let formattedSelectors = {};

    for (const projectId in selectorsByProject) {
      const selectors = selectorsByProject[projectId];
      // add a new project to the formatted selectors
      formattedSelectors[projectId] = [];
      // add the selectors for the project back into the formatted selectors, after formatting
      for (let i = 0; i < selectors.length; i++) {
        const selector = selectors[i];

        if (this.validateSelector(selector))
          throw new Error('Given invalid filter.');

        if (selector.type === 'project') {
          // don't need the other selectors if selecting the entire project
          formattedSelectors[projectId] = ['project'];
          break;
        }
        // call helper function to format
        const { start, end } = this.formatSelector(selector);
        formattedSelectors[projectId].push([start, end]);
      };

      // sort selectors of project by their start days in ascending order
      this.sortSelectors(formattedSelectors[projectId]);
    }
    return formattedSelectors;
  }

  /**
   * Get the most recent day of two days.
   */
  mostRecentDay = (day1, day2) => {
    if (day1 >= day2) return day1;
    return day2;
  }

  mergeSelectors = (selectorsByProject) => {
    let newSelectorsByProject = {};
    for (const projectId in selectorsByProject) {
      newSelectorsByProject[projectId] = [];
      let selectors = [...selectorsByProject[projectId]];
      let idx1 = 0, idx2 = 0;

      // if 'project' selector exists, it is the only selector
      if (selectors[idx1] === 'project') {
        newSelectorsByProject[projectId] = selectors;
        break;
      }

      while (idx2 < selectors.length) {
        // compare end of first selector to start of second
        if (selectors[idx1][1] < selectors[idx2][0]) {
          newSelectorsByProject[projectId].push(selectors[idx1]);
          idx1++;
          idx2++;
        } else {
          selectors[idx1][1] = this.mostRecentDay(selectors[idx1][1], selectors[idx2][1]);
          idx2++;
        }
      }
    };
    return newSelectorsByProject;
  }

  /**
   * Get ids of logs filtered by selectors.
   * Logs and selectors are grouped by project.
   */
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

  /**
     * Map a log's id to it's project's id.
     */
  mapIds = (currentProjects) => {
    let idMap = {};
    for (const project in currentProjects) {
      project.logIds.forEach(logId => idMap[logId] = project);
    }
    return idMap;
  }

  /**
   * Group logs by their projects
   */
  getLogsByProject = (currentProjects, logs) => {
    const logsByProject = {};
    const idMap = this.mapIds(currentProjects);
    logs.forEach(log => {
      logsByProject[idMap[log.id]].push(log);
    });
    return logsByProject;
  }

  /**
   * Get ids of logs filtered by selectors.
   */
  updateSelectedLogIds = () => {
    const selectorsByProject = this.formatSelectors(this.state.selectors);
    const mergedSelectorsByProject = this.mergeSelectors(selectorsByProject);
    return this.setState({ selectedLogIds: (this.state.logs.map(log => { return log.id })) });
    // ^ temporarily set selected log ids to all log ids. replace with fetch
    let logsByProject = this.getLogsByProject(this.state.currentProjects, this.state.logs);

    const selectedLogIds = this.getSelectedIds(mergedSelectorsByProject, logsByProject);
    this.setState({ selectedLogIds });
  }

  /**
   * Get logs given their ids and a list of logs.
   */
  getLogsFromIds = () => {
    let selectedLogs = [];
    let logsToSelect = {};
    this.state.selectedLogIds.forEach(logId => logsToSelect[logId] = true);
    selectedLogs = this.state.logs.filter(log => logsToSelect[log.id]);
    return selectedLogs;
  }


  render() {
    let selectedLogs = this.getLogsFromIds();

    return (
      <div className='view'>
        <SideBar viewLogs={this.updateSelectedLogIds} />
        <div className='view-wrapper'>
          <article className='view-main'>
            <ProjectTitles
              selectors={this.state.selectors}
              projects={this.state.currentProjects} />
            <Formatter
              format={this.state.format}
              updateFormat={this.updateLogListFormat}
              formatLogList={this.formatLogList} />
            <Exporter />
            <LogList logs={selectedLogs} />
          </article>
        </div>
      </div>
    );
  }
}

export default View;