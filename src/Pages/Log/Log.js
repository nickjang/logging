import React, { Component } from 'react';
import LoggerForm from '../../Components/Logger/LoggerForm/LoggerForm';
import Formatter from '../../Components/Formatter/Formatter';
import LogList from '../../Components/LogList/LogList';
import LoggingContext from '../../Context/LoggingContext';
import { updateListWithUpdatedLogs } from '../../Components/Utils/format-helper-functions';
import LoggingApiService from '../../services/logging-api-service';
import './Log.css';

class Log extends Component {
  state = {
    projects: [],
    currentDayLogs: [], // all logs for current day
    currentProjectId: null,
    currentProjectLogsIds: [], // ids of logs to display
    logger: {
      logId: null,
      start: null // start time if logger running
    },
    logListSelectedIds: [], // ids of logs selected in displayed log list
    loading: '',
    error: ''
  }

  addProject = (project) => {
    if (!project) throw new Error('Given invalid project.');

    const projects = [...this.state.projects, project];
    this.setState({
      projects,
      currentProjectId: project.id
    });
  }

  getRunningLog = (projectId) => {
    const logToEnd = this.state.currentDayLogs.filter(log =>
      !log.end_time && log.project_id == projectId
    );

    if (logToEnd.length === 1) {
      return logToEnd[0];
    } else if (!logToEnd.length) {
      return null;
    } else if (logToEnd.length > 1) {
      const project = this.state.projects.find(project => project.id == projectId);
      throw new Error(`More than one log is running for project, ${project.title}`);
    }
  }

  getProjectLogs = (projectId) => {
    return this.state.currentDayLogs
      .filter(log => log.project_id == projectId)
      .map(log => log.id);
  }

  updateCurrentProject = (projectId) => {
    // check if project exists
    if (!this.state.projects.find(project => String(project.id) === String(projectId)))
      throw new Error('Could not find selected project.');

    const currentProjectLogsIds = this.getProjectLogs(projectId); // ids of logs of newly selected project
    let logger;


    // check if there is a log already running
    const runningLog = this.getRunningLog(projectId);
    if (runningLog) {
      logger = {
        logId: runningLog.id,
        start: runningLog.start_time
      }
    } else {
      logger = {
        logId: null,
        start: null
      }
    }

    this.setState({
      currentProjectId: projectId,
      currentProjectLogsIds,
      logger
    });
  }

  toggleLogger = () => {
    if (!this.state.logger.start) {
      return LoggingApiService.postProjectLog(this.state.currentProjectId)
        .then(log => {
          log = {
            id: log.id,
            project_id: log.project_id,
            start_time: log.start_time,
            end_time: log.end_time,
            format: log.format
          };

          const currentDayLogs = [...this.state.currentDayLogs, log];
          const currentProjectLogsIds = [...this.state.currentProjectLogsIds, log.id];

          this.setState({
            currentDayLogs,
            currentProjectLogsIds,
            logger: {
              logId: log.id,
              start: log.start_time
            }
          });
        });
    } else {
      return LoggingApiService.endProjectLog(this.state.logger.logId)
        .then(log => {
          log = {
            id: log.id,
            project_id: log.project_id,
            start_time: log.start_time,
            end_time: log.end_time,
            format: log.format
          };

          const logIdx = this.state.currentDayLogs.findIndex(currLog => currLog.id === log.id);

          if (logIdx === -1)
            throw new Error('Ended a log that does not exist');
          if (log.id !== this.state.logger.logId)
            throw new Error('Got back a log different from the one ended');

          let currentDayLogs = [...this.state.currentDayLogs];
          currentDayLogs[logIdx] = log;

          this.setState({
            currentDayLogs,
            logger: {
              logId: null,
              start: null
            }
          });
        });
    }
  }

  getCurrentProjectLogs = () => {
    let logsToReturn = [];
    let idx1 = 0;
    let idx2 = 0;

    const helperSort = (a, b) => a > b ? -1 : a === b ? 0 : 1;
    const logList = [...this.state.currentDayLogs].sort((a, b) => helperSort(a.id, b.id));
    const idsToGet = [...this.state.currentProjectLogsIds].sort(helperSort);

    while (idx1 < idsToGet.length) {
      if (logList[idx2].id === idsToGet[idx1]) {
        logsToReturn.push(logList[idx2]);
        idx1++;
        idx2++;
      } else {
        idx2++;
      }
    }
    return logsToReturn;
  }

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
        updatedLogs = updatedLogs.map(log => {
          return {
            id: log.id,
            project_id: log.project_id,
            start_time: log.start_time,
            end_time: log.end_time,
            format: log.format
          };
        });

        let currentDayLogs = [...this.state.currentDayLogs];

        currentDayLogs = updateListWithUpdatedLogs(
          currentDayLogs, updatedLogs
        );

        this.setState({ currentDayLogs });
      });
  }

  componentDidMount() {
    this.setState(
      {
        loading: 'Loading projects...',
        error: ''
      },
      () => {
        Promise.all([
          LoggingApiService.getProjects(),
          LoggingApiService.getCurrentDayLogs()
        ])
          .then(async ([projects, currentDayLogs]) => {
            // filter data from projects and logs
            projects = projects.map(project => {
              return {
                id: project.id,
                title: project.title,
                date_created: project.date_created
              };
            })
            currentDayLogs = currentDayLogs.map(log => {
              return {
                id: log.id,
                project_id: log.project_id,
                start_time: log.start_time,
                end_time: log.end_time,
                format: log.format
              };
            });

            await this.setState({
              projects,
              currentDayLogs,
              loading: ''
            });
            this.updateCurrentProject(projects[0].id);
          })
          .catch(e => this.setState({ loading: '', error: e.message || e.error }));
      }
    )
  }

  render() {
    const contextValue = {
      projects: this.state.projects,
      currentProjectId: this.state.currentProjectId,
      updateCurrentProject: this.updateCurrentProject,
      addProject: this.addProject,
      loggerStartTime: this.state.logger.start,
      toggleLogger: this.toggleLogger
    }

    return (
      <LoggingContext.Provider value={contextValue}>
        <article className='log-page'>
          <output className='form-status'>{this.state.error || this.state.loading}</output>
          <LoggerForm />
          <Formatter
            listHasLogs={!!this.state.logListSelectedIds.length}
            updateFormats={this.updateFormats} />
          <LogList
            logs={this.getCurrentProjectLogs()}
            updateSelected={this.updateLogListSelectedOptions} />
        </article>
      </LoggingContext.Provider>
    );
  }
}

export default Log;
