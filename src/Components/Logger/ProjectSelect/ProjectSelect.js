import React, { Component } from 'react';
import ValidationError from '../../ValidationError/ValidationError';
import LoggingApiService from '../../../services/logging-api-service';
import LoggingContext from '../../../Context/LoggingContext';
import './ProjectSelect.css';

class ProjectSelect extends Component {
  state = {
    newProject: {
      new: false,
      value: '',
      touched: false
    },
    loading: false,
    fetchError: ''
  }

  static contextType = LoggingContext;

  projectRef = React.createRef();
  newProjectRef = React.createRef();

  handleNewButtonClick = (e) => {
    e.preventDefault();
    this.setState(
      {
        newProject: {
          new: true,
          value: '',
          touched: false
        }
      },
      () => {
        if (this.newProjectRef)
          this.newProjectRef.current.focus()
      }
    );
  }

  handleSubmitNew = (e) => {
    e.preventDefault();
    this.setState(
      {
        loading: true,
        fetchError: ''
      },
      () => {
        LoggingApiService.postProject(this.state.newProject.value)
          .then(project => {
            this.setState(
              {
                newProject: { new: false, value: '', touched: false },
                loading: false
              },
              this.context.addProject({
                id: project.id,
                title: project.title,
                date_created: project.date_created
              })
            )
          })
          .catch(e => {
            this.setState({
              loading: false,
              fetchError: e.error
            })
          }
          )
      }
    );
  }

  handleCancel = (e) => {
    e.preventDefault();
    this.setState({
      newProject: { new: false, value: '', touched: false }
    });
  }

  updateNewProject = (project) => {
    this.setState({
      newProject: {
        new: true,
        value: project,
        touched: true
      }
    });
  }

  validateNewProject = () => {
    const newProject = this.state.newProject.value.trim();
    if (!newProject) return 'Project name cannot be empty.';
    return;
  }


  renderSelect = () => {
    const options = this.context.projects.map(project =>
      <option key={project.id} value={project.id}>{project.title}</option>
    );

    return (
      <h2 className='group-row'>
        <select
          id='project-select'
          name='project'
          ref={this.projectRef}
          aria-label='Choose a project to log in.'
          aria-required='true'
          value={this.context.currentProjectId || ''}
          onChange={(e) => this.context.updateCurrentProject(e.target.value)}>
          {options}
        </select>
        <button
          className='lg-btn lg-btn-light ml-1'
          type='button'
          onClick={(e) => this.handleNewButtonClick(e)}
        > New
        </button>
      </h2>
    );
  }

  renderNew = (numProjects) => {
    return (
      <>
        <output className={`form-status ${this.state.fetchError ? 'fail-status' : ''}`}>
          {this.state.fetchError || (this.state.loading && 'Adding...')}
        </output>
        <input
          type='text'
          id='new-project'
          name='new-project'
          ref={this.newProjectRef}
          placeholder='Enter a new project title.'
          aria-label='Enter a new project title:'
          onChange={(e) => this.updateNewProject(e.target.value)} />
        <div className='lg-text-right mt-1'>
          <button
            className='lg-btn lg-btn-success mr-1'
            type='submit'
            form='project-form'
            onClick={(e) => this.handleSubmitNew(e)}
            disabled={this.validateNewProject()}
          >Submit</button>
          <button
            className='lg-btn lg-btn-reset'
            type='reset'
            form='project-form'
            onClick={(e) => this.handleCancel(e)}
            disabled={!numProjects}
          >Cancel</button>
        </div>
        {this.state.newProject.touched
          && <ValidationError errorFor='new-project' message={this.validateNewProject()} />}
      </>
    );
  }

  componentDidMount() {
    if (this.projectRef.current)
      this.projectRef.current.focus();
  }

  render() {
    let numProjects = 0;
    if (this.context.projects)
      numProjects = this.context.projects.length;

    return (
      <fieldset form='project-form' name='project' className='lg-card project-select'>
        {this.state.newProject.new || !numProjects
          ? this.renderNew(numProjects)
          : this.renderSelect()}
      </fieldset>
    );
  }
}

export default ProjectSelect;