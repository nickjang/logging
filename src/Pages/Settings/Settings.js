import React, { Component } from 'react';
import AccountInput from '../../Components/AccountInput/AccountInput';
import AuthApiService from '../../services/auth-api-service';
import './Settings.css';

class Settings extends Component {
  state = {
    email: {
      value: '',
      touched: false,
      updated: false
    },
    password: {
      value: '',
      touched: false
    },
    newEmail: {
      value: '',
      touched: false,
    },
    newPassword: {
      value: '',
      touched: false
    },
    error: ''
  }

  emailRef = React.createRef();

  updateEmail = (email) => {
    this.setState({ email: { value: email, touched: true, updated: this.state.email.updated } });
  }

  updatePassword = (password) => {
    this.setState({ password: { value: password, touched: true } });
  }

  updateNewEmail = (newEmail) => {
    this.setState({ newEmail: { value: newEmail, touched: true } });
  }

  updateNewPassword = (newPassword) => {
    this.setState({ newPassword: { value: newPassword, touched: true } });
  }

  validateEmail = (isCurrEmail) => {
    let email;
    if (isCurrEmail)
      email = this.state.email.value.trim();
    else
      email = this.state.newEmail.value.trim();

    if (!email) return 'Email cannot be empty.';
    if (!email.includes('@')) return 'Email must include \'@\'.';
    if (!email.split('@')[1].includes('.')) return 'Email must include a \'.\'.';
    if (email.length < 5) return 'Please enter a valid email.';
    return;
  }

  validatePassword = (isCurrPassword) => {
    let password;
    if (isCurrPassword)
      password = this.state.password.value.trim();
    else
      password = this.state.newPassword.value.trim();

    if (!password) return 'Password cannot be empty.';
    if (password.length < 8) return 'Password must be at least 8 characters.';
    if (!(/\d/.test(password))) return 'Password must contain at least one number.';
    return;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    
    this.setState(
      { error: '' },
      () => {
        AuthApiService.updateUser(
          this.state.newEmail.value,
          this.state.newPassword.value
        )
          .then(user => {
            this.setState(
              {
                email: {
                  value: user.email,
                  touched: this.state.email.touched,
                  updated: true
                }
              },
              () => this.props.onUpdateSuccess()
            );
          })
          .catch(res => {
            this.setState({ error: res.error })
          });
      }
    );
  }

  handleDeleteAccount = (e) => {
    e.preventDefault();
    this.setState(
      { error: '' },
      () => {
        AuthApiService.deleteUser()
          .catch(res => {
            this.setState({ error: res.error })
          });
      }
    );
  }

  componentDidMount() {
    if (this.emailRef.current) this.emailRef.current.focus();
  }

  render() {
    return (
      <article className='account-form settings'>
        <h2 className='lg-title'>Settings</h2>
        <section>
          <h3 className='lg-title'>Account Settings</h3>
          <output form='account-settings-form'>
            {this.state.error ||
              (this.state.email.updated &&
                `Updated email: ${this.state.email.value}`)}
          </output>
          <form id='account-settings-form'>
            <AccountInput
              form='account-settings-form'
              id='email'
              type='email'
              touched={this.state.email.touched}
              ref={el => this.emailRef = el}
              validate={() => this.validateEmail(true)}
              update={this.updateEmail}
              hint={<sup>*</sup>} />
            <AccountInput
              form='account-settings-form'
              id='password'
              type='password'
              touched={this.state.password.touched}
              validate={() => this.validatePassword(true)}
              update={this.updatePassword}
              hint={<sup>*</sup>} />
            <AccountInput
              form='account-settings-form'
              id='new-email'
              type='email'
              touched={this.state.newEmail.touched}
              validate={() => this.validateEmail(false)}
              update={this.updateNewEmail} />
            <AccountInput
              form='account-settings-form'
              id='new-password'
              type='password'
              touched={this.state.newPassword.touched}
              validate={() => this.validatePassword(false)}
              update={this.updateNewPassword} />
            <button
              className='lg-btn lg-btn-success mt-1 mr-1'
              type='submit'
              form='account-settings-form'
              onClick={(e) => { this.handleSubmit(e) }}
              disabled={this.validateEmail(true) ||
                this.validatePassword(true) ||
                (this.validateEmail(false) && this.validatePassword(false))}
            > Submit
            </button>
            <button
              className='lg-btn lg-btn-reset'
              type='reset'
              form='account-settings-form'
              onClick={(e) => { this.handleDeleteAccount(e) }}
              disabled={this.validateEmail(true) || this.validatePassword(true)}
            > Delete Account
            </button>
          </form>
        </section>
      </article>
    );
  }
}

export default Settings;