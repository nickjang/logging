import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import AccountInput from '../../AccountInput/AccountInput';
import './AccountForm.css';

class AccountForm extends Component {
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
            <AccountInput 
              form='account-settings-form' 
              type='email' 
              ref={this.emailRef} 
              validate={this.validateEmail} 
              update={this.updateEmail} />
            <AccountInput 
              form={form} 
              type='password' 
              validate={this.validatePassword} 
              update={this.updatePassword} />
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

AccountForm.defaultProps = {
  type: 'login'
}

AccountForm.propTypes = {
  type: PropTypes.oneOf(['login', 'sign-up'])
}

export default withRouter(AccountForm);