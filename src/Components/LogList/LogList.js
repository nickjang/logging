import React, { Component } from 'react';
import PropTypes from 'prop-types';
import formatLog from '../Formatter/formatLog';
import './LogList.css';

class LogList extends Component {
  //flatten picked before getting logs
  //do that before here so loglist doesn't flatten every rerender
  //logs should be chronological, even from different projects
  //select logs based on log's start time


  render() {
    const options = this.props.logs.map(log =>
      <option
        key={log.id}
        value={log.id}
      >{formatLog(log.start, log.end, log.format)}
      </option>
    );

    const updateSelectedLogs = (logs) => {
    }

    return (
      <section className='log-list'>
        <h3>Logs</h3>
        <form action='' id='logs-select-form' className='log-list-form'>
          {/* only accepts option or optgroup */}
          <select
            id='logs-list-select'
            name='logs'
            multiple
            aria-label='Select logs you would like to format. Selected logs can be formatted in any format logs box on the page.'
            aria-required='true'
            // onChange={(e) => console.log(Array.from(e.target.selectedOptions, option => option.value))}
          >
            {options}
          </select>
        </form>
        <aside className='note'>Logs are automatically updated to their project.</aside>
      </section>
    );
  }
}

LogList.defaultProps = {
  logs: [],
}

LogList.propTypes = {
  logs: PropTypes.array,
}

export default LogList;