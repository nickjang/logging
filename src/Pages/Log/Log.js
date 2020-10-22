//updateProject
//context: project
//state: last format => apply last format to new logs
//state: logs with their formats
//state: selected log id

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
