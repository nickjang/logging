import React, { Component } from 'react';
import ProjectPicker from '../ProjectPicker/ProjectPicker';

class SideBar extends Component {
  state = {
    loading: false,
    fetchError: {
      code: '',
      message: ''
    }
  }

  // fetchProjectsORAllProjectsAndLogs() {}
  // if user enters site from viewpage, 
  // fetch project or all projects and logs to load sidebar

  // fetchLogs() {}
  // if all logs not loaded in App already, see handlesubmit below

  /* if not loading all logs, fetch logs on submit*/
  handleSubmit = (e) => {
    e.preventDefault();
    //loading/error
    //use picked context to store picked, and fetch logs of picked;

    //otherwise, remove handlesubmit and view selected button,
    //and put picked context in viewmain page and store picked there
    //and update main page on picked update.
    //--------------------------------------------------
    //if store all projects and logs in app, add newly created logs to inital fetch of all logs
    //and pass all projects and logs to view main page,
    //but also passes and stores all projects and logs to log main page

    //if store just projects in app, fetch newly created logs when clicking logmain page,
    //and include viewselectedbutton and fetch logs when clicking view button in sidebar,
    //but need to fetch logs each time click view and can't deactivate days there's no logs
  }

  render() {
    const projects = this.props.projects.map(project => 
      <ProjectPicker key={project.id} />
    );
    return (
      <aside class='sidebar'>
        <output form='sidebar-form' className='form-status'>{this.state.fetchError || (this.state.loading && 'Loading projects...')}</output>
        {/* fetch projects if not already fetch on log in -- but will log in be saved on refresh?*/}
        {/* also for getting logs if all logs not stored in state*/}
        <p class='note'>View logs from selected projects or their year(s), month(s), and day(s).</p>
        <button type='submit' form='sidebar-form' onClick={(e) => { this.handleSubmit(e) }}>View Selected</button>
        <p class='note'>Overlapping logs will be counted once</p>
        <form action='' id='sidebar-form'>
          {/*<!--add scroll so view button stays in view-->*/}
          <ul>
            {projects}
          </ul>
        </form >
      </aside >
    );
  }
}

export default SideBar;