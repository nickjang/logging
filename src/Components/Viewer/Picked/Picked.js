import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CalendarPicker from '../CalendarPicker/CalendarPicker'
import PickedContext from '../PickedContext';
import './Picked.css';

class Picked extends Component {
  static contextType = PickedContext;

  handleDelete = (e) => {
    e.preventDefault();
    this.context.deletePicked(this.props.id);
  }

  handleAddRange = (e) => {
    e.preventDefault();
    this.context.addEndRange(this.props.id);
  }

  renderEntireProject = () => {
    return (<span>Entire Project</span>);
  };

  renderDate = () => {
    return (
      <>
        <CalendarPicker 
          pickedId={this.props.id}
          type={this.props.type} 
          value={this.props.calendar.value} 
          open={this.props.calendar.open}
          updatePicked={this.context.updatePicked} />
        <span>to</span>
        {
          !this.props.endRange.value && !this.props.endRange.open  ?
            <input
              type='button'
              aria-label={`Make the selection a range by adding an ending ${this.props.type}`}
              onClick={(e) => this.handleAddRange}
            >+</input> :
            <CalendarPicker 
              pickedId={this.props.id}
              type={this.props.type} 
              value={this.props.endRange.value} 
              open={this.props.endRange.open}
              updatePicked={this.context.updateEndRange} />
        }
      </>
    );
  };

  render() {
    return (
      <li class='group-row'>
        {this.props.type === 'project' ? this.renderEntireProject() : this.renderDate()}
        <input
          type='button'
          value={this.props.id}
          aria-label='Delete this selection'
          onClick={(e) => this.handleDelete(e)}
        >x</input>
      </li>
    );
  };
}

Picked.defaultProps = {
  id: '',
  type: '',
  calendar: {
    value: '',
    open: false
  },
  endRange:  {
    value: '',
    open: false
  }
}

Picked.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['project', 'year', 'month', 'day']).isRequired,
  calendar: PropTypes.shape({
    value: PropTypes.string,
    open: PropTypes.bool
  }),
  endRange: PropTypes.shape({
    value: PropTypes.string,
    open: PropTypes.bool
  })
}

export default Picked;