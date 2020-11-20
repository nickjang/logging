import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './LogButton.css';

class LogButton extends Component {
  state = {
    log: {
      logging: false,
      start: null,
      end: null
    },
    fetchError: ''
  }

  componentDidMount() {
    //fetch, logging project still?
  }

  startEndLog = () => {
    //if start, fetcherror/logging, fetch, setstate start // if never stop
    //if stop, fetcherror/logging, fetch, setstate stop, add log to MainLog state for main log list 

  }

  render() {
    return (
      <>
        <output className='form-status log-button-status'>{this.state.fetchError || (this.state.log.logging && 'Logging...')}</output>
        <input
          type='button'
          value={this.state.log.logging ? 'End' : 'Start'}
          aria-label='Start or end a log.'
          className='log-button'
          onClick={(e) => this.startEndLog(e)}/>
      </>
    );
  }
}

LogButton.defaultProps = {
  addLog: () => { }
}

LogButton.propTypes = {
  addLog: PropTypes.func.isRequired
}

export default LogButton;