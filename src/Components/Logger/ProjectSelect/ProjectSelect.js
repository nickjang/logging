import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ValidationError from '../../ValidationError/ValidationError';
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
    fetchError: {
      code: '',
      message: ''
    }
  }

  static contextType = LoggingContext;

  projectRef = React.createRef();
  newProjectRef = React.createRef();

  handleNewButtonClick = (e) => {
    e.preventDefault();
    this.setState(
      { newProject: { new: true, value: '', touched: false } },
      () => { if (this.newProjectRef) this.newProjectRef.current.focus() }
    );
  }

  handleSubmitNew = (e) => {
    e.preventDefault();
    //loading/error
    //fetch(put)
    // add to state/context
    //new: false
  }

  handleCancel = (e) => {
    e.preventDefault();
    this.setState({ newProject: { new: false, value: '', touched: false } })
  }

  updateNewProject = (project) => {
    this.setState({ newProject: { new: true, value: project, touched: true } });
  }

  validateNewProject = () => {
    const newProject = this.state.newProject.value.trim();
    if (!newProject) return 'Project name cannot be empty.';
    return;
  }

  componentDidMount() {
    if (this.projectRef) this.projectRef.current.focus();
  }

  renderSelect = () => {
    const options = this.context.projects.map(project =>
      <option key={project.id} value={project.id}>{project.name}</option>);

    return (
      <h2>
        <select
          id='project-select'
          name='project'
          ref={this.projectRef}
          aria-label='Choose a project to log in.'
          aria-required='true'
          onChange={(e) => this.props.updateProject(e.target.value)}>
          {/*Automatically selects last logged project in context, or newly created project.*/}
          {options}
        </select>
        <button type='button' onClick={(e) => this.handleNewButtonClick(e)}>New</button>
      </h2>
    );
  }

  renderNew = () => {
    return (
      <>
        <output className='form-status'>{this.state.fetchError.message || (this.state.loading && 'Adding...')}</output>
        <input
          type='text'
          id='new-project'
          name='new-project'
          ref={this.newProjectRef}
          placeholder='Enter a new project title.'
          aria-label='Enter a new project title:'
          onChange={(e) => this.updateNewProject(e.target.value)} />
        <button
          type='submit'
          form='project-form'
          onClick={(e) => this.handleSubmitNew(e)}
          disabled={this.validateNewProject()}
        >Submit
        </button>
        <button type='reset' form='project-form' onClick={(e) => this.handleCancel(e)}>Cancel</button>
        {this.state.newProject.touched
          && <ValidationError errorFor='new-project' message={this.validateNewProject()} />}
      </>
    );
  }

  render() {
    return (
      <fieldset form='project-form' name='project'>
        {!this.state.newProject.new ? this.renderSelect() : this.renderNew()}
      </fieldset>
    );
  }
}

ProjectSelect.defaultProps = {
  updateProject: () => { },
  addNewProject: () => { }
}

ProjectSelect.propTypes = {
  updateProject: PropTypes.func.isRequired,
  addNewProject: PropTypes.func.isRequired
}

export default ProjectSelect;