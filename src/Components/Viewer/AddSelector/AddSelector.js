import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SelectorContext from '../../../Context/SelectorContext';
import './AddSelector.css';

class Selector extends Component {
  static contextType = SelectorContext;

  handleClick = (e) => {
    e.preventDefault();
    this.context.addSelector(this.props.projectId, this.props.type);
  }

  render() {
    return (
      <input
        type='button'
        value={this.props.buttonText}
        aria-label={this.props.label}
        onClick={(e) => { this.handleClick(e) }} />
    );
  };
}

Selector.defaultProps = {
  type: '',
  label: '',
  buttonText: '',
  projectId: null,
}

Selector.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  projectId: PropTypes.number.isRequired
}

export default Selector;