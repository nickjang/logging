import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Picked from '../Picked/Picked';
import TypePicker from '../TypePicker/TypePicker';
import './ProjectPicked.css';

class ProjectPicker extends Component {
  render() {
    const pickedList = (
      this.props.pickedList.map(picked =>
        <Picked
          key={picked.id}
          id={picked.id}
          type={picked.type}
          calendar={picked.calendar}
          endRange={picked.endRange} />)
    );

    const pickedTypes = [
      { type: 'project', label: 'Select the entire project', button: '+ Entire Project' },
      { type: 'years', label: 'Make a selection for a year or year range', button: '+ Year(s)' },
      { type: 'months', label: 'Make a selection for a month or month range', button: '+ Month(s)' },
      { type: 'days', label: 'Make a selection for a day or date range', button: '+ Day(s)' }
    ].map(pickedType =>
      <TypePicker
        type='button'
        value={pickedType.type}
        aria-label={pickedType.label}
        onClick={(e) => { this.handleClick(e, pickedType.type) }} />);

    return (
      <li>
        <h3>this.props.project</h3>
        <fieldset class='group-row'>
          {pickedTypes}
        </fieldset>
        <ul class='selected' role='presentation'>
          {/*on view, combine times and get logs without overlap*/}
          {pickedList}
        </ul >
      </li >
    );
  }
}

ProjectPicker.defaultProps = {
  project: '',
  pickedList: []
}

ProjectPicker.propTypes = {
  project: PropTypes.string.isRequired,
  pickedList: PropTypes.arrayOf(PropTypes.object)
}

export default ProjectPicker;