import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Selector from '../Selector/Selector';
import AddSelector from '../AddSelector/AddSelector';
import SelectorContext from '../../../Context/SelectorContext';
import './ProjectPicker.css';

class ProjectPicker extends Component {
  static contextType = SelectorContext;

  render() {
    let selectorList = [];
    if (this.context.selectors) {
      selectorList = (
        this.context.selectors[this.props.project.id].map(selector =>
          <Selector
            key={selector.id}
            id={selector.id}
            type={selector.type}
            calendar={selector.calendar}
            endRange={selector.endRange}
            projectId={this.props.project.id} />
        )
      );
    }

    const selectorTypes =
      [{ type: 'project', label: 'Select the entire project', buttonText: '+ Entire project' },
      { type: 'years', label: 'Make a selection for a year or year range', buttonText: '+ Year(s)' },
      { type: 'months', label: 'Make a selection for a month or month range', buttonText: '+ Month(s)' },
      { type: 'days', label: 'Make a selection for a day or date range', buttonText: '+ Day(s)' }]
        .map(selectorType => {
          return (
            <AddSelector
              key={`${this.props.project.id}-${selectorType.type}`}
              type={selectorType.type}
              label={selectorType.label}
              buttonText={selectorType.buttonText}
              projectId={this.props.project.id} />
          );
        });

    return (
      <li className='project-picker'>
        <h3 className='lg-project-title side-bar-project-title ml-1'>
          {this.props.project.title}
        </h3>
        <fieldset className='add-selector-group group-row'>
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
  project: {}
}

ProjectPicker.propTypes = {
  project: PropTypes.object.isRequired
}

export default ProjectPicker;