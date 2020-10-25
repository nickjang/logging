import React, { Component } from 'react';
import AccountForm from '../../Components/AccountForm/AccountForm';
import LoggingContext from '../../Context/LoggingContext';
import './Login.css';

class Login extends Component {
  static contextType = LoggingContext;

  render() {
    if (this.context.account.email) this.props.history.push('/');
    
    return (
      <AccountForm type='login' />
    );
  }
}

export default Login;