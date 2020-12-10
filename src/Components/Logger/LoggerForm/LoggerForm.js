import React, { Component } from 'react';
import ProjectSelect from '../ProjectSelect/ProjectSelect';
import LogButton from '../LogButton/LogButton';
import './LoggerForm.css';

class LoggerForm extends Component {
  render() {
    return (
      <form action='' id='project-form' className='logger-form group-col'>
        <ProjectSelect />
        <LogButton />
      </form>
    );
  }
}

export default LoggerForm;