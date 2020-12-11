import React, { Component } from 'react';
import './Overview.css';

class Overview extends Component {
  handleNext = (e) => {
    e.preventDefault();
    this.props.history.push('/getting-started');
  }

  render() {
    return (
      <article className='overview'>
        <h2 className='lg-title'>Welcome to the logging app!</h2>
        <div>
          <p>You can create logs by pressing start or stop,</p>
          <p>view your logs by clicking on the View tab at the top,</p>
          <p>and highlight logs you want to adjust.</p>
        </div>
        <button
          className='lg-btn lg-btn-light mt-2'
          onClick={(e) => { this.handleNext(e) }}
        > Next
        </button>
      </article>
    );
  }
}

export default Overview;