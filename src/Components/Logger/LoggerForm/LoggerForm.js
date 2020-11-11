import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProjectSelect from '../ProjectSelect/ProjectSelect';
import LogButton from '../LogButton/LogButton';
import './LoggerForm.css';

class LoggerForm extends Component {
  render() {
    return (
      <form action='' id='project-form' className='logger-form group-col'>
        <ProjectSelect updateProject={this.props.updateProject} />
        <LogButton />
      </form>
    );
  }
}

ProjectSelect.defaultProps = {
  updateProject: ()=>{}
}

ProjectSelect.propTypes = {
  updateProject: PropTypes.func.isRequired
}

export default LoggerForm;