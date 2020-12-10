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
    const loading = '...';
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
        <output className='form-status log-button-status fail-status'>
          {this.state.fetchError}
        </output>
        <input
          className={`
            log-button 
            ${this.context.loggerStartTime
              ? 'log-button-end'
              : 'log-button-start'}`}
          type='button'
          value={this.state.loading ||
            (this.context.loggerStartTime ? 'End' : 'Start')}
          aria-label='Start or end a log.'
          onClick={(e) => this.toggleLogButton(e)}
          disabled={!this.context.currentProjectId} />
      </>
    );
  }
}

export default LogButton;