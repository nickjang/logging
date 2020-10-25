import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ValidationError from '../ValidationError/ValidationError';
import './AccountInput.css';

class AccountInput extends Component {
  render() {
    let inputLabel = this.props.type.replace('-', ' ');
    inputLabel = inputLabel.charAt(0).toUpperCase() + inputLabel.slice(1) + ':';

    return (
      <fieldset form={this.props.form} name={this.props.type}>
        <label htmlFor={this.props.type}>{inputLabel}</label>
        <label htmlFor={this.props.type} className='hint'>* required</label>
        <input
          type={this.props.type}
          id={this.props.type}
          name={this.props.type}
          ref={this.props.inputRef || null}
          aria-required='true'
          aria-describedby={this.props.type + '-error-message'}
          aria-label={`Enter a ${this.props.type.replace('-', ' ')}:`}
          aria-invalid={!!this.props.validate()}
          onChange={(e) => this.props.update(e.target.value)} />
        {this.props.touched && <ValidationError id={this.props.type + '-error-message'} errorFor={this.props.type} message={this.props.validate()} />}
      </fieldset>
    );
  };
}

AccountInput.defaultProps = {
  form: '',
  type: '',
  touched: false,
  validate: () => { },
  update: () => { },
  inputRef: null
}

AccountInput.propTypes = {
  form: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  touched: PropTypes.bool.isRequired,
  validate: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  inputRef: PropTypes.func
}

export default AccountInput;