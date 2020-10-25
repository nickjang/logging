import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import LoggingContext from '../../Context/LoggingContext';
import './Overview.css';

class Overview extends Component {
  static contextType = LoggingContext;

  handleNext = (e) => {
    e.preventDefault();
    this.props.history.push('/getting-started');
  }

  render() {
    if (this.context.account.email) this.props.history.push('/');
    
    return (
      <main>
        <article>
          <h2>Welcome to the logging app!</h2>
          <p>You can create logs by starting and stopping the clock.</p>
          <p>View your logs by clicking on the View page at the top.</p>
          <p>Highlight logs you want to adjust or export, also from the View page.</p>
          <button onClick={(e) => { this.handleNext(e) }}>Next</button>
        </article>
      </main>
    );
  }
}

export default withRouter(Overview);