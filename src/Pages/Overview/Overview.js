import React, {Component} from 'react';
import Header from '../../Components/Header/Header';
import Welcome from '../../Components/Introduction/Welcome/Welcome';
import './Overview.css';

class Overview extends Component {
  render() {
    return (
      <>
        <Header type='welcome'/>
        <Welcome />
      </>
    );
  }
}

export default Overview;