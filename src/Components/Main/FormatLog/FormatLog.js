import React, { Component } from 'react';

class FormatLog extends Component {
  state = {
    min: null,
    sec: null,
    formatting: false,
    fetchError: {
      code: '',
      message: ''
    }
  }

  updateMinute = (min) => {
    this.setState({ min });
  }

  updateSecond = (sec) => {
    this.setState({ sec });
  }

  formatSelected = (e) => {
    e.preventDefault();
    //formatting/error
    //context get project
    //get selected logs from state
    //fetch(put)
    // apply format to selected logs, or get from api and setState in main log or loglist with updated logs
    //save format as last format in state
  }

  render() {
    return (
      <section class='format-logs'>
        <h3>Format Logs</h3>
        <output form='format-form' className='form-status'>{this.state.fetchError.message || (this.state.formatting && 'Saving format...')}</output>
        <form action='' id='format-form'>
          <fieldset form='format-form' name='format-time'>
            <legend>To the nearest multiple of:</legend>
            <time>
              <input
                type='number'
                id='format-minute'
                name='minute'
                min={0}
                max={59}
                placeholder='05'
                onChange={(e) => this.updateMinute(e.target.value)} />
              <label for='format-minute'>(min)</label>
              <span>:</span>
              <input
                type='number'
                id='format-second'
                name='second'
                min={0}
                max={59}
                placeholder='00'
                onChange={(e) => this.updateSecond(e.target.value)} />
              <label for='format-second'>(sec)</label>
            </time>
            {/* Deleting input applies no format */}
          </fieldset>
          <button
            type='submit'
            form='format-form'
            onClick={(e) => this.format(e)}
          >Format
          </button>
        </form>
      </section>
    );
  }
}

const formatLog = (log, format) => {
  //apply format to log
  return log;
}

export default {
  FormatLog,
  formatLog
};