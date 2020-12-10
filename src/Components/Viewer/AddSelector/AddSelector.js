import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SelectorContext from '../../../Context/SelectorContext';
import './AddSelector.css';

class AddSelector extends Component {
  static contextType = SelectorContext;

  handleClick = (e) => {
    e.preventDefault();
    this.context.addSelector(this.props.projectId, this.props.type);
  }

  render() {
    return (
      <input
        className='lg-btn lg-btn-light add-selector'
        type='button'
        value={this.props.buttonText}
        aria-label={this.props.label}
        onClick={(e) => { this.handleClick(e) }} />
    );
  };
}

AddSelector.defaultProps = {
  type: '',
  label: '',
  buttonText: '',
  projectId: null,
}

AddSelector.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  projectId: PropTypes.number.isRequired
}

export default AddSelector;