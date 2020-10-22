import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import MainHeader from '../Components/Header/Header';
import Overview from '../Pages/Overview/Overview';
import './App.css';
// no context or complex functionality because API
// reuasability
// add checkpoints
// prebuilt components: React calendar/datepicker
class App extends Component {
  state = {
    projects: [
      {
        id: '',
        logs: [{ id: '', start: '', end: '' }]
      }
    ]
  }
  
  render() {
    return (
      <main className='App' >
        {/* Redirect to welcome page if not logged in or show error to log in? */}
        <MainHeader />
        <Switch>
          <Route exact path='/' component={Overview} />
        </Switch>
      </main>
    );
  }
}

export default App;