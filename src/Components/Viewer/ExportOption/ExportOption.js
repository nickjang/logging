import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ExportOption.css'

class ExportOption extends Component {
  render() {
    const id = this.props.option.toLowerCase().replace(' ', '-');
    return (
      <div className='group-row' role={this.props.role || null}>
        <input
          type={this.props.type}
          id={id}
          name={this.props.name}
          ref={this.props.inputRef || null}
          value={id}
          form={this.props.form || null}
          onChange={(e) => this.props.update(e.target.value)} />
        <label htmlFor={id}>{this.props.option}</label>
      </div>
    );
  };
}

ExportOption.defaultProps = {
  type:'radio',
  option: '',
  name: '',
  inputRef: null,
  form: '',
  update: ()=>{},
  role: ''
}

ExportOption.propTypes = {
  type: PropTypes.string.isRequired,
  option: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  inputRef: PropTypes.func,
  form: PropTypes.string,
  update: PropTypes.func,
  role: PropTypes.string
}

export default ExportOption;