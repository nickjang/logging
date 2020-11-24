//updateProject
//context: project
//state: last format => apply last format to new logs
//state: logs with their formats
//state: selected log id

/*
keep state in a single object or obbject in a single context, 
not seprate log and project in different

arrayofproject and array of logs-->and is only of current project, 
context will only hold logs for whetever logs of project is currently selected. 
and can filter for selected logs if needed.

setProject(projectid) fetches logs
*/

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import LoggerForm from '../../Components/Logger/LoggerForm/LoggerForm';
import Formatter from '../../Components/Formatter/Formatter';
import LogList from '../../Components/LogList/LogList';
import LoggingContext from '../../Context/LoggingContext';
import formatLog from '../../Components/Formatter/formatLog';
import './Log.css';
import LoggingApiService from '../../services/logging-api-service';

class Log extends Component {
  state = {
    projects: [],
    currentDayLogs: [], // all logs for current day
    currentProjectId: 0,
    format: {
      min: 0,
      sec: 0,
      touched: false
    },
    loading: false,
    fetchError: ''
  }

  addProject = (project) => {
    if (!project) throw new Error('Given invalid project.');
    const projects = [...this.state.projects, project];
    this.setState({ 
      projects, 
      currentProjectId: project.id 
    });

  }

  updateCurrentProject = (id) => {
    const project = this.state.projects.filter(project => project.id == id);
    if (!project.length) throw new Error('Could not find selected project.');
    this.setState({ currentProjectId: id });
  }

  addLog = (log) => {
    if (!log) throw new Error('Given invalid log.');
    const currentDayLogs = [...this.state.currentDayLogs, log];
    this.setState({ currentDayLogs });
  }

  updateFormat = (type, num) => {
    let { min, sec } = this.state.format;

    num = parseInt(num);
    if (type === 'min') min = num;
    else if (type === 'sec') sec = num;
    this.setState({ format: { min, sec, touched: true } });
  }

  formatLogList = () => {
    formatLog({}, {}); //formatlogs not log?
  }

  currentDayProjectLogs = () => {
    return this.state.currentDayLogs.map(log =>
      log.project_id === this.state.currentProjectId
    );
  }

  componentDidMount() {
    this.setState(
      {
        loading: true,
        fetchError: ''
      },
      () => {
        Promise.all([
          LoggingApiService.getProjects(),
          LoggingApiService.getCurrentDayLogs()
        ])
          .then(([projects, currentDayLogs]) => {
            console.log(projects, currentDayLogs)
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
                end_time: log.end_time
              };
            });
            this.setState({
              projects,
              currentDayLogs,
              loading: false
            });
          })
          .catch(e => this.setState({ loading: false, fetchError: e.message }));
      }
    )
  }

  render() {
    const contextValue = {
      projects: this.state.projects,
      currentProjectId: this.state.currentProjectId,
      updateCurrentProject: this.updateCurrentProject,
      addProject: this.addProject,
      addLog: this.addLog
    }

    return (
      <LoggingContext.Provider value={contextValue}>
        <article className='log-page'>
          <output className='form-status'>{this.state.fetchError || (this.state.loading && 'Loading projects...')}</output>
          <LoggerForm />
          <Formatter
            format={this.state.format}
            updateFormat={this.updateFormat}
            formatLogList={this.formatLogList} /> {/* format logs somehow*/}
          <LogList logs={this.currentDayProjectLogs()} />
        </article>
      </LoggingContext.Provider>
    );
  }
}

export default withRouter(Log);
