import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Formatter.css';

class Formatter extends Component {
  state = {
    formatting: false,
    fetchError: ''
  }

  updateMinute = (min) => {
    this.props.updateFormat('min', min);
  }

  updateSecond = (sec) => {
    this.props.updateFormat('sec', sec);
  }

  formatSelected = (e) => {
    e.preventDefault();
    //formatting/error
    //context get project
    //get selected logs from state
    //fetch(put)
    // apply format to selected logs, or get from api and setState in main log or loglist with updated logs
    //save format as last format in state
    //this.props.formatLogList();
  }

  render() {
    return (
      <section className='formatter lg-card'>
        <h3 className='lg-title'>Format Logs</h3>
        <output form='format-form' className='form-status'>{this.state.fetchError || (this.state.formatting && 'Saving format...')}</output>
        <form action='' id='format-form' className='mt-1'>
          <fieldset form='format-form' name='format-time'>
            <legend>To the nearest multiple of:</legend>
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
              <span>:</span>
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
            {/* Deleting input applies no format */}
          </fieldset>
          <div className='lg-text-right mt-1'>
            <button
              className='lg-btn lg-btn-success'
              type='submit'
              form='format-form'
              disabled={!this.props.format.touched}
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
  format: {
    min: 0,
    sec: 0,
    touched: false
  },
  updateFormat: () => { },
  formatLogList: () => { }
};

Formatter.propTypes = {
  format: PropTypes.shape({
    min: PropTypes.number,
    sec: PropTypes.number,
    false: PropTypes.bool
  }),
  updateFormat: PropTypes.func.isRequired,
  formatLogList: PropTypes.func.isRequired
};

export default Formatter;