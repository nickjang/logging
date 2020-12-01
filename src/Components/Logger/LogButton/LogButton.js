import React, { Component } from 'react';
import LoggingContext from '../../../Context/LoggingContext';

import './LogButton.css';

class LogButton extends Component {
  state = {
    loading: '',
    fetchError: '',
  }

  static contextType = LoggingContext;

  toggleLogButton = (e) => {
    e.preventDefault();
    const loading = this.context.loggerStartTime ? 'Ending log ...' : 'Starting log ...';
    this.setState(
      {
        loading,
        fetchError: ''
      },
      () => {
        this.context.toggleLogger()
          .then(() => this.setState({ loading: '', fetchError: '' }))
          .catch(e => this.setState({
            loading: '',
            fetchError: e.message || e.error
          }));
      }
    );
  }

  render() {
    return (
      <>
        <output className='form-status log-button-status'>{this.state.fetchError || this.state.loading}</output>
        <input
          type='button'
          value={this.context.loggerStartTime ? 'End' : 'Start'}
          aria-label='Start or end a log.'
          className='log-button'
          onClick={(e) => this.toggleLogButton(e)}
          disabled={!this.context.currentProjectId} />
      </>
    );
  }
}

export default LogButton;