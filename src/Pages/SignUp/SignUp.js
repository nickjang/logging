import React, {Component} from 'react';
import Header from '../../Components/Header/Header';
import AccountForm from '../../Components/Introduction/AccountForm/AccountForm';
import './SignUp.css';

class SignUp extends Component {
  render() {
    return (
      <>
        <Header />
        <AccountForm />
      </>
    );
  }
}

export default SignUp;