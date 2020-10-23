import React, { Component } from 'react';
import Header from '../../Components/Header/Header';
import ProjectTitles from '../../Components/Viewer/ProjectTitles/ProjectTitles';
import Formatter from '../../Components/Formatter/Formatter';
import Exporter from '../../Components/Viewer/Exporter/Exporter';
import LogList from '../../Components/LogList/LogList';
import SideBar from '../../Components/Viewer/SideBar/SideBar';
import './View.css';

class View extends Component {
  state = {
    currentProjects: [{ id: '', name: '', logIds: [] }],
    logs: [{ id: '', value: '' }],
    picked: [
      {
        projectId: '',
        picks: [
          {
            id: '',
            type: 'day',
            calendar: { value: '00-00-0000', open: false },
            endRange: { value: '', open: false }
          }
        ]
      }
    ]
  };

  mergePicked = () => {

  }

  updateFormat = () => {

  }

  render() {
    return (
      <>
        <Header type='main' />
        <SideBar />
        <main>
          <ProjectTitles picked={this.state.picked} projects={this.state.currentProjects} />
          <Formatter updateFormat={this.updateFormat} />
          <Exporter />
          <LogList logs={this.state.logs} status='' />
        </main>
      </>
    );
  }
}

export default View;