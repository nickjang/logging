import React, { Component } from 'react';
import AuthApiService from '../../services/auth-api-service';
import './Start.css';

class Start extends Component {
  state = {
    loading: false,
    error: ''
  }

  handleSignUpClick = (e) => {
    e.preventDefault();
    this.props.history.push('/sign-up');
  }

  handleDemoClick = (e) => {
    // Log into demo account
    e.preventDefault();

    this.setState({ loading: true, error: '' });
    AuthApiService.postLogin({
      email: 'demo@demo.com',
      password: 'Demo!123'
    })
      .then(res => {
        this.setState(
          { loading: false },
          () => {
            const { location, history } = this.props;
            const destination = (location.state || {}).from || '/';
            history.push(destination);
            window.location.reload();
          }
        );
      })
      .catch(res => {
        this.setState({ loading: false, error: res.error })
      })
  }

  render() {
    return (
      <section className='start'>
        <h2 className='lg-title'>Create an account, or use the demo account.</h2>
        <p>With the demo account, you’ll be able to use all the apps features using a shared public account.</p>
        <span className={`status ${this.state.error ? 'fail-status' : ''}`}>
          {this.state.error || (this.state.loading && 'Loading...')}
        </span>
        <div>
          <button
            className='lg-btn lg-btn-light mt-2 mr-1'
            onClick={(e) => { this.handleSignUpClick(e) }}
          > Sign Up
          </button>
          <button
            className='lg-btn lg-btn-light mt-2'
            onClick={(e) => { this.handleDemoClick(e) }}
          > Demo
          </button>
        </div>
      </section>
    );
  }
}

export default Start;