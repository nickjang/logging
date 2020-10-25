import React, { Component } from 'react';
import ProjectTitles from '../../Components/Viewer/ProjectTitles/ProjectTitles';
import Formatter from '../../Components/Formatter/Formatter';
import Exporter from '../../Components/Viewer/Exporter/Exporter';
import LogList from '../../Components/LogList/LogList';
import SideBar from '../../Components/Viewer/SideBar/SideBar';
import LoggingContext from '../../Context/LoggingContext';
import formatLog from '../../Components/Formatter/formatLog';
import './View.css';

// context -- project list
// don't use moment?
// set up error boundary for log list, and fetch?

class View extends Component {
  state = {
    currentProjects: { 'example-project-id': { name: '', logIds: [] } },
    logs: [{ id: '', start: null, end: null }], //sorted by start time //add logs on addSelector, deactivate days there are no logs
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

  static contextType = LoggingContext;

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
   * Update format for logs
   */
  formatLogList = () => {
    formatLog({}, {}); //put this function in Formatter/formatLog?
  }

  /**
   * Validate the selector's type.
   */
  validateSelector = (selector) => {
    return !['project', 'year', 'month', 'day'].includes(selector.type);
  }

  /**
   * Format selectors to have a start and end 
   * range in MM-DD-YYYY format, or format to 
   * select the entire project. Given an array 
   * of projects and their selectors.
   */
  formatSelectors = (selectors) => {
    const monthDays = {
      '01': '31', '02': '29', '03': '31', '04': '30',
      '05': '31', '06': '30', '07': '31', '08': '31',
      '09': '30', '10': '31', '11': '30', '12': '31'
    }

    let formattedSelectors = {};
    selectors.forEach(project => {
      formattedSelectors[project.projectId] = [];
      for (let i = 0; i < project.selectors.length; i++) {
        const selector = project.selectors[i];
        let start = selector.calendar.value;
        let end = selector.endRange.value || selector.calendar.value;

        if (this.validateSelector(selector))
          throw new Error('Given invalid filter.');

        if (selector.type === 'project') {
          formattedSelectors[project.projetId] = ['project'];
          break;
        } else if (selector.type === 'year') {
          start = `$01-01-${start}`;
          end = `12-31-${end}`;
        } else if (selector.type === 'month') {
          start = start.split('-');
          end = end.split('-');
          start = `${start[0]}-01-${start[1]}`;
          end = `${end[0]}-${monthDays.end[0]}-${end[1]}`;
        }
        formattedSelectors[project.projectId].push([start, end]);
      };
    });
    return formattedSelectors;
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
        }
      }
    };
    this.setState({ selectedLogIds });
  }

  /**
   * Get ids of logs filtered by selectors.
   */
  updateSelectedLogIds = (selectors, currentProjects, logs) => {
    let selectedLogIds = {};
    const formattedSelectors = this.formatSelectors(selectors);
    let logsByProject = this.getLogsByProject(currentProjects, logs);

    selectedLogIds = this.getSelectedIds(formattedSelectors, logsByProject);
    this.setState({ selectedLogIds });
  }

  /**
   * Get logs given their ids and a list of logs.
   */
  getLogsFromIds = (logIds, logs) => {
    let selectedLogs = [];
    let logsToSelect = {};
    logIds.forEach(logId => logsToSelect[logId] = true);
    selectedLogs = logs.filter(log => logsToSelect[log.id]);
    return selectedLogs;
  }


  render() {
    if (!this.context.account.email) this.props.history.push('/overview');

    let selectedLogs = this.getLogsFromIds(this.state.selectedLogIds, this.state.logs);

    return (
      <>
        <SideBar />
        <main>
          <ProjectTitles selectors={this.state.selectors} projects={this.state.currentProjects} />
          <Formatter
            format={this.state.format}
            updateFormat={this.updateLogListFormat}
            formatLogList={this.formatLogList} />
          <Exporter />
          <LogList logs={selectedLogs} />
        </main>
      </>
    );
  }
}

export default View;