import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Formatter.css';

class Formatter extends Component {
  state = {
    minutes: {
      value: null,
      touched: false
    },
    seconds: {
      value: null,
      touched: false
    },
    loading: '',
    error: ''
  }

  updateMinute = (minutes) => {
    this.setState({
      minutes: {
        value: minutes,
        touched: true
      }
    });
  }

  updateSecond = (seconds) => {
    this.setState({
      seconds: {
        value: seconds,
        touched: true
      }
    });
  }

  validateMinutes = () => {
    return (
      !isNaN(parseInt(this.state.minutes.value)) &&
      this.state.minutes.touched
    );
  }

  validateSeconds = () => {
    return (
      !isNaN(parseInt(this.state.seconds.value)) &&
      this.state.seconds.touched
    );
  }

  formatSelected = (e) => {
    e.preventDefault();

    // if LogList has no logs selected, display error
    if (!this.props.listHasLogs)
      return this.setState({ error: 'Select logs from the list below' });

    const minutes = parseInt(this.state.minutes.value);
    const seconds = parseInt(this.state.seconds.value);

    this.setState(
      {
        loading: 'Formatting logs...',
        error: ''
      },
      () => this.props.updateFormats(minutes, seconds)
        .then(this.setState({ loading: '' }))
        .catch(e => this.setState({ loading: '', error: e.message || e.error }))
    );
  }

  render() {
    return (
      <section className='formatter lg-card'>
        <h3 className='lg-title'>Format Logs</h3>
        <output
          form='format-form'
          className={`form-status ${this.state.error ? 'fail-status' : ''}`}
        > {this.state.error || this.state.loading}
        </output>
        <form action='' id='format-form' className='mt-1'>
          <fieldset form='format-form' name='format-time'>
            <legend>To the nearest multiple of</legend>
            <time>
              <input
                type='number'
                id='format-minute'
                name='minute'
                step={1}
                min={0}
                max={59}
                placeholder='05'
                onChange={(e) => this.updateMinute(e.target.value)} />
              <label htmlFor='format-minute'>(min)</label>
              <span> : </span>
              <input
                type='number'
                id='format-second'
                name='second'
                step={1}
                min={0}
                max={59}
                placeholder='00'
                onChange={(e) => this.updateSecond(e.target.value)} />
              <label htmlFor='format-second'>(sec)</label>
            </time>
          </fieldset>
          <div className='lg-text-right mt-1'>
            <button
              className='lg-btn lg-btn-success'
              type='submit'
              form='format-form'
              disabled={!this.validateMinutes() || !this.validateSeconds()}
              onClick={(e) => this.formatSelected(e)}
            > Format
            </button>
          </div>
        </form>
      </section>
    );
  }
}

Formatter.defaultProps = {
  listHasLogs: false,
  updateFormats: () => { }
};

Formatter.propTypes = {
  listHasLogs: PropTypes.bool.isRequired,
  updateFormats: PropTypes.func.isRequired
};

export default Formatter;