import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PickedContext from '../PickedContext';
import './TypePicker.css';

class TypePicker extends Component {
  static contextType = PickedContext;

  handleClick = (e) => {
    e.preventDefault();
    this.context.addPicked(this.props.type);
  }

  render() {
    return (
      <input
        type='button'
        value={this.props.type}
        aria-label={this.props.label}
        onClick={(e) => { this.handleClick(e) }}
      > {this.props.button}
      </input>
    );
  };
}

TypePicker.defaultProps = {
  type: '',
  label: '',
  button: ''
}

TypePicker.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  button: PropTypes.string.isRequired
}

export default TypePicker;