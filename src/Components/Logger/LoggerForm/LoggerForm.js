import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProjectSelect from '../ProjectSelect/ProjectSelect';
import LogButton from '../LogButton/LogButton';
import './LoggerForm.css';

class LogForm extends Component {
  render() {
    return (
      <form action='' id='project-form'>
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

export default LogForm;