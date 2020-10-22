import React, { Component } from 'react';
import Header from '../../Components/Header/Header';
import ProjectTitles from '../../Components/Viewer/ProjectTitles/ProjectTitles';
import Formatter from '../../Components/Formatter/Formatter';
import Exporter from '../../Components/Viewer/Exporter/Exporter';
import LogList from '../../Components/LogList/LogList';
import SideBar from '../../Components/Viewer/SideBar/SideBar';
import './View.css';

class View extends Component {
  render() {
    return (
      <>
        <Header />
        <SideBar />
        <main>
          <ProjectTitles />
          <Formatter />
          <Exporter />
          <LogList />
        </main>
      </>
    );
  }
}

export default View;