import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SelectorContext from '../SelectorContext';
import './Selector.css';

class Selector extends Component {
  static contextType = SelectorContext;

  handleClick = (e) => {
    e.preventDefault();
    this.context.addSelector(this.props.type);
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

Selector.defaultProps = {
  type: '',
  label: '',
  button: ''
}

Selector.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  button: PropTypes.string.isRequired
}

export default Selector;