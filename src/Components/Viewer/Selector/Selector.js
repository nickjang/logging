import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CalendarPicker from '../CalendarPicker/CalendarPicker'
import SelectorContext from '../../../Context/SelectorContext';
import './Selector.css';

class Selector extends Component {
  static contextType = SelectorContext;

  handleDelete = (e) => {
    e.preventDefault();
    this.context.deleteSelector(this.props.projectId, this.props.id);
  }

  handleAddRange = (e) => {
    e.preventDefault();
    this.context.addEndRange(this.props.projectId, this.props.id);
  }

  renderEntireProject = () => {
    return (<span>Entire Project</span>);
  };

  renderDate = () => {
    return (
      <>
        <CalendarPicker
          selectorId={this.props.id}
          type={this.props.type}
          value={this.props.calendar.value}
          open={this.props.calendar.open}
          updateSelector={this.context.updateSelector} />
        <span>to</span>
        {
          !this.props.endRange.added
            ? <input
              type='button'
              value='+'
              aria-label={`Make the selection a range by adding an ending ${this.props.type}`}
              onClick={(e) => this.handleAddRange(e)} />
            : <CalendarPicker
              selectorId={this.props.id}
              type={this.props.type}
              value={this.props.endRange.value}
              open={this.props.endRange.open}
              updateSelector={this.context.updateEndRange} />
        }
      </>
    );
  };

  render() {
    return (
      <li className='group-row'>
        {this.props.type === 'project' ? this.renderEntireProject() : this.renderDate()}
        <input
          type='button'
          value='x'
          aria-label='Delete this selection'
          onClick={(e) => this.handleDelete(e)} />
      </li>
    );
  };
}

Selector.defaultProps = {
  id: '',
  type: '',
  calendar: {
    value: '',
    open: false
  },
  endRange: {
    added: false,
    value: '',
    open: false
  },
  projectId: null
}

Selector.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['project', 'years', 'months', 'days']).isRequired,
  calendar: PropTypes.shape({
    value: PropTypes.string,
    open: PropTypes.bool
  }),
  endRange: PropTypes.shape({
    added: PropTypes.bool,
    value: PropTypes.string,
    open: PropTypes.bool
  }),
  projectId: PropTypes.number.isRequired
}

export default Selector;