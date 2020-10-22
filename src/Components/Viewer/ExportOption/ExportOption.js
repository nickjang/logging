import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ExportOption.css'

class ExportOption extends Component {
  render() {
    const id = this.props.option.toLowerCase().replace(' ', '-');
    return (
      <div class='group-row' role={this.props.role || null}>
        <input
          type={this.props.type}
          id={id}
          name={this.props.name}
          ref={this.props.ref || null}
          value={id}
          form={this.props.form || null}
          checked={this.props.selected.includes(id)}
          onChange={(e) => this.props.update(e.target.value)} />
        <label for={id}>{this.props.option}</label>
      </div>
    );
  };
}

ExportOption.defaultProps = {
  type:'radio',
  option: '',
  name: '',
  ref: {},
  form: '',
  selected: [],
  update: ()=>{},
  role: ''
}

ExportOption.propTypes = {
  type: PropTypes.string.isRequired,
  option: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  ref: PropTypes.object,
  form: PropTypes.string,
  selected: PropTypes.arrayOf(PropTypes.string),
  update: PropTypes.func,
  role: PropTypes.string
}

export default ExportOption;