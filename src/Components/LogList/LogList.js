import React, { Component } from 'react';
import PropTypes from 'prop-types';
import formatLog from '../Formatter/formatLog';
import './LogList.css';

class LogList extends Component {
  state = {
    selected: [],
    firstInteracted: {
      id: '',
      isSelected: false
    },
    shiftPressing: false,
    mouseDown: false
  }

  //flatten picked before getting logs
  //do that before here so loglist doesn't flatten every rerender
  //logs should be chronological, even from different projects
  //select logs based on log's start time

  /**
   * Allow dragging over item to select or 
   * unselect it. 
   * If mouse is down, then select/unselect
   * based on the first option interacted with.
   */
  handleMouseOver = (id) => {
    if (this.state.mouseDown) {
      const isSelected = this.state.selected.includes(id);
      let selected = [...this.state.selected];
      // If firstInteracted doesn't exist, select/unselect option and set it as firstInteracted
      if (!this.state.firstInteracted.id) {
        if (isSelected) selected = selected.filter(log => log !== id);
        else selected.push(id);
        this.setState({ firstInteracted: { id, isSelected: !isSelected }, selected });
      } else {
        // If firstInteracted exists, select based on it
        if (this.state.firstInteracted.isSelected) {
          if (isSelected) return;
          this.setState({ selected: [...selected, id] });
        } else {
          if (!isSelected) return;
          selected = selected.filter(log => log !== id);
          this.setState({ selected });
        }
      }
    }
  }

  /**
   * All select/unselect multiple logs with shift.
   * If shift key down and firstInteracted exists, 
   * select/unselect indexes from firstInteracted
   * to log clicked based on firstInteracted. 
   * If shift key down, then select/unselect. 
   * If shift not key down, select/unselect item 
   * that was mouseupped. 
   */
  handleMouseUp = (id) => {
    const isSelected = this.state.selected.includes(id);
    let selected = [...this.state.selected];

    if (this.state.shiftPressing) {
      // if firstInteracted exists, select based on firstInteracted
      if (this.state.firstInteracted.id) {
        if (this.state.firstInteracted.isSelected) {
          if (isSelected) return;
          this.setState({ selected: [...selected, id] });
        } else {
          if (!isSelected) return;
          selected = selected.filter(log => log !== id);
          this.setState({ selected });
        }
        // if firstInteracted doesn't exist, select/unselect option and set it as firstInteracted
      } else {
        if (isSelected) selected = selected.filter(log => log !== id);
        else selected.push(id);
        this.setState({ firstInteracted: { id, isSelected: !isSelected }, selected })
      }
    } else {
      if (isSelected) selected = selected.filter(log => log !== id);
      else selected.push(id);
      this.setState({ selected });
    }
  }

  handleShiftKeyDown = (e) => {
    if (e.keyCode === 16) this.setState({ shiftPressing: true });
  }

  handleShiftKeyUp = (e) => {
    if (e.keyCode === 16) this.setState({ shiftPressing: false, firstInteracted: '' });
  }

  updateSelectedLogs = (logs) => {
  }

  componentDidMount = () => {
    document.addEventListener('keydown', (e) => this.handleShiftKeyDown(e));
    document.addEventListener('keyup', (e) => this.handleShiftKeyUp(e));
    document.addEventListener('mousedown', () => this.setState({ mouseDown: true }));
    document.addEventListener('mouseup', () => this.setState({ mouseDown: false, firstInteracted: '' }));
  }

  render() {
    const options = this.props.logs.map(log =>
      <option
        value={log.id}
        onMouseOver={(e) => this.handleMouseOver(e.target.value)}
        onMouseUp={(e) => this.handleMouseUp(e.target.value)}
      >{formatLog(log.value, log.format)}
      </option>
    );

    return (
      <section className='logs'>
        <h3>Logs</h3>
        <span className='form-status'>{this.props.status || 'Please select logs to view from the side bar.'}</span>
        <form action='' id='logs-select-form'>
          {/* only accepts option or optgroup */}
          <select
            id='logs-list-select'
            name='logs'
            multiple
            value={this.state.selected}
            aria-label='Select logs you would like to format. Selected logs can be formatted in any format logs box on the page.'
            aria-required='true'
            onChange={(e) => this.updateSelectedLogs(e.target.value)}
          >
            {options}
          </select>
          <div className='curly-brace'>
            <img src=''
              alt='The top of a curly brace that show which logs are selected. Selected logs can be formatted in any format logs box on the page.' />
            <img src=''
              alt='The middle of a curly brace that shows which logs are selected. Selected logs can be formatted in any format logs box on the page.' />
            <img src=''
              alt='The bottom of a curly brace that shows which logs are selected. Selected logs can be formatted in any format logs box on the page.' />
          </div>
        </form>
        <aside className='note'>Logs are automatically updated to their project.</aside>
      </section>
    );
  }
}

LogList.defaultProps = {
  logs: [],
  status: ''
}

LogList.propTypes = {
  logs: PropTypes.array,
  status: PropTypes.string
}

export default LogList;