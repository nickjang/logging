import React, { Component } from 'react';
import AccountForm from '../../Components/AccountForm/AccountForm';
import LoggingContext from '../../Context/LoggingContext';
import './SignUp.css';

class SignUp extends Component {
  static contextType = LoggingContext;
  
  render() {
    if (this.context.account.email) this.props.history.push('/');
    
    return (
      <AccountForm type='sign-up' />
    );
  }
}

export default SignUp;