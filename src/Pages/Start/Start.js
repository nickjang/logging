import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import LoggingContext from '../../Context/LoggingContext';
import './Start.css';

class Start extends Component {
  static contextType = LoggingContext;

  handleSignUpClick = (e) => {
    e.preventDefault();
    this.props.history.push('/sign-up');
  }

  handleDemoClick = (e) => {
    // Log into demo account
    e.preventDefault();
    this.props.history.push('/overview');
  }

  render() {
    if (this.context.account.email) this.props.history.push('/');
    
    return (
      <main>
        <section>
          <p>Create an account, or use the demo account.</p>
          <p>With the demo account, you’ll be able to use the app’s features; however, logs made with the demo account won’t be saved to the server. You’ll also see demo logs already in your view page.</p>
          <button onClick={(e) => { this.handleSignUpClick(e) }}>Sign Up</button>
          <button onClick={(e) => { this.handleDemoClick(e) }}>Demo</button>
        </section>
      </main>
    );
  }
}

export default withRouter(Start);