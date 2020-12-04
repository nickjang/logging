import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProjectPicker from '../ProjectPicker/ProjectPicker';
import SelectorContext from '../../../Context/SelectorContext';
import './SideBar.css';

class SideBar extends Component {
  state = {
    open: true,
    loading: false,
    error: ''
  }

  static contextType = SelectorContext;

  /**
   * Open or close the sidebar.
   */
  handleToggleOpen = () => {
    this.setState({ open: !this.state.open });
  }

  /**
   * Return whether the user has made selectors.
   */
  hasSelectors = () => {
    const selectors = this.context.selectors;
    for (const projectId in selectors) {
      if (selectors[projectId].length) {
        // if there were selectors, check if any selector has a value
        const projectSelectors = selectors[projectId];
        for (const selector of projectSelectors)
          if (selector.calendar.value) return true;
      }
    }
    return false;
  }

  /**
   * Fetch logs by user's selectors.
   */
  handleSubmit = (e, fetchLogs) => {
    e.preventDefault();
    this.setState(
      {
        loading: true,
        error: ''
      },
      () => {
        fetchLogs()
          .then(() => this.setState({ loading: false }))
          .catch(e => this.setState({ loading: false, error: e.message || e.error }));
      }
    );
  }


  render() {
    const projects = this.context.projects.map(project =>
      <ProjectPicker key={project.id} project={project} />
    );

    return (
      <aside className='sidebar'>
        {this.state.open &&
          <div className='sidebar-main'>
            <p className='note'>
              View logs from selected projects
              or their year(s), month(s), and day(s).
            </p>
            <button
              type='submit'
              form='sidebar-form'
              onClick={(e) => { this.handleSubmit(e, this.props.fetchLogs) }}
              disabled={!this.hasSelectors()}
            > View Selected
            </button>
            <output form='sidebar-form' className='form-status'>
              {this.state.error || (this.state.loading && 'Getting logs...')}
            </output>
            <p className='note'>
              Overlapping logs will be counted once.
              Calendars are displayed in your time zone.
              Logs will also displayed in your time zone.
            </p>
            <form action='' id='sidebar-form'>
              <ul>
                {projects}
              </ul>
            </form >
          </div>}
        <button
          className='open-sidebar'
          onClick={(e) => this.handleToggleOpen(e, this.state.open)}
        > {'<'}
        </button>
      </aside >

    );
  }
}

SideBar.defaultProps = {
  fetchLogs: () => { }
}

SideBar.propTypes = {
  fetchLogs: PropTypes.func.isRequired
}

export default SideBar;