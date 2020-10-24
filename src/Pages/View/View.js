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
    selectors: [
      {
        projectId: '',
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
  };

  /**
   * Validate the selector's type.
   * -------------------Set up Error boundary!
   */
  validateSelector = (selector) => {
    return !['project', 'year', 'month', 'day'].includes(selector.type);
  }

  formatSelectors = (selectors) => {
    const monthDays = {
      '01': '31', '02': '29', '03': '31', '04': '30',
      '05': '31', '06': '30', '07': '31', '08': '31',
      '09': '30', '10': '31', '11': '30', '12': '31'
    }

    let formattedSelectors = {};
    selectors.forEach(project => {
      formattedSelectors[project.projectId] = [];
      // format each selector to a start and end range
      for (let i = 0; i < project.selectors.length; i++) {
        const selector = project.selectors[i];
        let start = selector.calendar.value;
        let end = selector.endRange.value || selector.calendar.value;

        if (this.validateSelector(selector))
          throw new Error('Given invalid filter.');

        // if the entire project is a selector, break
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

  getLogs = (selectors) => {
    // flatten per project and then get logs, merge
    // don't use moment?
    const formattedSelectors = this.formatSelectors(selectors);
    
  }

  updateFormat = () => {

  }

  render() {
    let logListStatus = 'Please select logs to view from the side bar.';
    const selectedLogs = [];
    let idx1 = 0, idx2 = 0;

    try {
      while (idx1 < this.state.selectedLogIds.length) {
        if (this.state.selectedLogIds[idx1] === this.state.logs[idx2].id) {
          selectedLogs.push(this.state.logs[idx2]);
          idx1++;
          idx2++;
        } else {
          idx2++;
        }
      }
      logListStatus = '';
    } catch (e) {
      logListStatus = 'Failed to get some or all logs.';
    }

    return (
      <>
        <Header type='main' />
        <SideBar />
        <main>
          <ProjectTitles selectors={this.state.selectors} projects={this.state.currentProjects} />
          <Formatter updateFormat={this.updateFormat} />
          <Exporter />
          <LogList logs={selectedLogs} status={logListStatus} />
        </main>
      </>
    );
  }
}

export default View;