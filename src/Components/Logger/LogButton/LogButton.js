import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LogButton extends Component {
  state = {
    log: {
      logging: false,
      start: null,
      stop: null
    },
    fetchError: {
      code: '',
      message: ''
    }
  }

  componentDidMount() {
    //fetch, logging project still?
  }

  startStopLog = () => {
    //if start, fetcherror/logging, fetch, setstate start // if never stop
    //if stop, fetcherror/logging, fetch, setstate stop, add log to MainLog state for main log list 

  }

  render() {
    return (
      <>
        <output className='form-status'>{this.state.fetchError || (this.state.log.logging && 'Logging...')}</output>
        <input 
          type='button' 
          value='start' 
          aria-label='Start a log.'
          onClick={(e) => this.startStopLog(e)}
        >Start/Stop
        </input>
      </>
    );
  }
}

LogButton.defaultProps = {
  addLog: () => {}
}

LogButton.propTypes = {
  addLog: PropTypes.func.isRequired
}

export default LogButton;