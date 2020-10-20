import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import ValidationError from '../../ValidationError/ValidationError';

import 'Login.css';

class Login extends Component {
  state = {
    email: {
      value: '',
      touched: false
    },
    password: {
      value: '',
      touched: false
    },
    loading: false,
    fetchError: {
      code: '',
      message: ''
    }
  }

  emailRef = React.createRef();
  passwordRef = React.createRef();

  updateEmail = (email) => {
    this.setState({ email: { value: email, touched: true } });
  }

  updatePassword = (password) => {
    this.setState({ password: { value: password, touched: true } });
  }

  validateEmail = () => {
    const email = this.state.email.value.trim();
    if (!email) return 'Email cannot be empty.';
    if (!email.includes('@')) return 'Email must include \'@\'.';
    if (!email.split('@')[1].includes('.')) return 'Email must include a \'.\'.';
    if (email.length < 5) return 'Please enter a valid email.';
    return;
  }

  validatePassword = () => {
    const password = this.state.password.value.trim();
    if (!password) return 'Password cannot be empty.';
    if (password.length < 8) return 'Password must be at least 8 characters.';
    if (!(/\d/.test(password))) return 'Password must contain at least one number.';
    return;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    //loading/error
    // api validate and get projects only. get format and logs on view page click
    // set context with account
    this.props.history.push('/');
  }

  componentDidMount() {
    if (this.emailRef) this.emailRef.current.focus();
  }

  render() {
    const title = this.props.type === 'login' ? 'Login' : 'Sign up';
    const form = this.props.type + '-form';
    return (
      <main>
        <section>
          <h2>Welcome to the logging app!</h2>
          <h3>{title}</h3>
          <output form={form} className='form-status'>{this.state.fetchError.message || (this.state.loading && 'Loading...')}</output>
          <form action='' id={form}>
            <fieldset form={form} name='email'>
              <label htmlFor='email'>Email:</label>
              <label htmlFor='email' className='hint'>* required</label>
              <input
                type='email'
                id='email'
                name='email'
                ref={this.emailRef}
                aria-required='true'
                aria-describedby='email-error-message'
                aria-label='Enter an email:'
                aria-invalid={!!this.validateEmail()}
                onChange={(e) => this.updateEmail(e.target.value)}
              />
              {this.state.email.touched && <ValidationError id='email-error-message' errorFor='email' message={this.validateEmail()} />}
            </fieldset>
            <fieldset form={form} name='password'>
              <label htmlFor='password'>Password:</label>
              <label htmlFor='password' className='hint'>* required</label>
              <input
                ref={this.passwordRef}
                type='password'
                id='password'
                name='password'
                aria-required='true'
                aria-describedby='password-error-message'
                aria-label='Enter a password:'
                aria-invalid={!!this.validatePassword()}
                onChange={(e) => this.updatePassword(e.target.value)}
              />
              {this.state.password.touched && <ValidationError id='password-error-message' errorFor='password' message={this.validatePassword()} />}
            </fieldset>
            <button
              type='submit'
              form={form}
              onClick={(e) => { this.handleSubmit(e) }}
              disabled={this.validateEmail() || this.validatePassword()}
            > {title}
            </button>
          </form>
        </section>
      </main>
    );
  }
}

Login.defaultProps = {
  type: 'login'
}

Login.propTypes = {
  type: PropTypes.oneOf(['login', 'sign-up'])
}

export default withRouter(Login);