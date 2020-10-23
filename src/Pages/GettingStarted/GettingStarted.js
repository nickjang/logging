import React, {Component} from 'react';
import Header from '../../Components/Header/Header';
import Start from '../../Components/Introduction/Start/Start';
import './GettingStarted.css';

class GettingStarted extends Component {
  render() {
    return (
      <>
        <Header type='welcome'/>
        <Start />
      </>
    );
  }
}

export default GettingStarted;