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
          key='calendar'
          projectId={this.props.projectId}
          selectorId={this.props.id}
          isStart={true}
          type={this.props.type}
          value={this.props.calendar.value} />
        <span>to</span>
        {
          !this.props.endRange.added
            ? <input
                type='button'
                value='+'
                aria-label={`Make the selection a range by adding an ending ${this.props.type}`}
                onClick={(e) => this.handleAddRange(e)} />
            : <CalendarPicker
                key='endRange'
                projectId={this.props.projectId}
                selectorId={this.props.id}
                isStart={false}
                type={this.props.type}
                value={this.props.endRange.value} />
        }
      </>
    );
  };

  render() {
    return (
      <li className='group-row'>
        {
          this.props.type === 'project'
            ? this.renderEntireProject()
            : this.renderDate()
        }
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
  },
  endRange: {
    added: false,
    value: '',
  },
  projectId: null
}

Selector.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['project', 'years', 'months', 'days']).isRequired,
  calendar: PropTypes.shape({
    value: PropTypes.object,
  }),
  endRange: PropTypes.shape({
    added: PropTypes.bool,
    value: PropTypes.object,
  }),
  projectId: PropTypes.number.isRequired
}

export default Selector;