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

class View extends Component {
  state = {
    currentProject: 'example-project-id',
    logs: [], // logs of the project for the day
    format: {
      min: 0,
      sec: 0,
      touched: false
    }
  }
  static contextType = LoggingContext;

  updateProject = () => { }

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

  render() {
    if (!this.context.account.email) this.props.history.push('/overview');

    return (
      <main>
        <LoggerForm projects={this.context.projects} updateProject={this.updateProject} />
        <Formatter format={this.state.format} updateFormat={this.updateFormat} formatLogList={this.formatLogList} /> {/* format logs somehow*/}
        <LogList logs={this.state.logs} status='' />
      </main>
    );
  }
}

export default withRouter(View);
