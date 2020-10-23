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
import Header from '../../Components/Header/Header';
import LoggerForm from '../../Components/Logger/LoggerForm/LoggerForm';
import Formatter from '../../Components/Formatter/Formatter';
import LogList from '../../Components/LogList/LogList';
import './View.css';

class View extends Component {
  updateProject = () => {}

  render() {
    return (
      <>
        <Header type='main' />
        <main>
          <LoggerForm updateProject={this.updateProject} />
          <Formatter /> {/* format logs somehow*/}
          <LogList logs={[]} status=''/>
        </main>
      </>
    );
  }
}

export default View;
