import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Selector from '../Selector/Selector';
import AddSelector from '../AddSelector/AddSelector';
import './ProjectPicker.css';

class ProjectPicker extends Component {
  render() {
    const selectorList = (
      this.props.selectorList.map(selector =>
        <Selector
          key={selector.id}
          id={selector.id}
          type={selector.type}
          calendar={selector.calendar}
          endRange={selector.endRange} />)
    );

    const selectorTypes =
      [{ type: 'project', label: 'Select the entire project', button: '+ Entire Project' },
      { type: 'years', label: 'Make a selection for a year or year range', button: '+ Year(s)' },
      { type: 'months', label: 'Make a selection for a month or month range', button: '+ Month(s)' },
      { type: 'days', label: 'Make a selection for a day or date range', button: '+ Day(s)' }]
        .map(selectorType => {
          return (
            <AddSelector
              key={`${this.props.projectId}-add-selector-${selectorType.type}`}
              type='button'
              value={selectorType.type}
              aria-label={selectorType.label}
              onClick={(e) => { this.handleClick(e, selectorType.type) }} />
          );
        });

    return (
      <li>
        <h3>{this.props.project}</h3>
        <fieldset className='group-row'>
          {selectorTypes}
        </fieldset>
        <ul className='selected' role='presentation'>
          {/*on view, combine times and get logs without overlap*/}
          {selectorList}
        </ul >
      </li >
    );
  }
}

ProjectPicker.defaultProps = {
  projectId: '',
  project: '',
  selectorList: [] // wrong, or something in this file need correct inputs
}

ProjectPicker.propTypes = {
  projectId: PropTypes.string.isRequired,
  project: PropTypes.string.isRequired,
  selectorList: PropTypes.arrayOf(PropTypes.object)
}

export default ProjectPicker;