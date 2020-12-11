import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatLog } from '../Utils/format-helper-functions';
import './LogList.css';

class LogList extends Component {
  handleSelect = (selected) => {
    selected = Array.from(selected, option => parseInt(option.value));
    this.props.updateSelected(selected);
  }

  render() {
    const options = this.props.logs.map((log) =>
      <option key={log.id} value={log.id}>
        {formatLog(log.start_time, log.end_time, log.format)}
      </option>
    );

    return (
      <section className='log-list'>
        <h3 className='lg-title'>Logs</h3>
        <form action='' id='logs-select-form' className='log-list-form mt-1'>
          <select
            id='logs-list-select'
            name='logs'
            multiple
            aria-label='Select logs you would like to format. Selected logs can be formatted in any format logs box on the page.'
            aria-required='true'
            onChange={(e) => this.handleSelect(e.target.selectedOptions)}
          >
            {options}
          </select>
        </form>
        <aside className='note mt-2'>Select logs to format them. The original time is preserved.</aside>
        <aside className='note'>Try 01:01 to get the original.</aside>
      </section >
    );
  }
}

LogList.defaultProps = {
  logs: [],
  updateSelected: () => { }
}

LogList.propTypes = {
  logs: PropTypes.array,
  updateSelected: PropTypes.func.isRequired
}

export default LogList;