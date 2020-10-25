import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import MainHeader from '../Components/Header/Header';
import Overview from '../Pages/Overview/Overview';
import Start from '../Pages/Start/Start';
import SignUp from '../Pages/SignUp/SignUp';
import Login from '../Pages/Login/Login';
import Log from '../Pages/Log/Log';
import View from '../Pages/View/View';
import Settings from '../Pages/Settings/Settings';
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
        <MainHeader />
        <Switch>
          <Route exact path='/' component={Log} />
          <Route path='/overview' component={Overview} />
          <Route path='/getting-started' component={Start} />
          <Route path='/sign-up' component={SignUp} />
          <Route path='/login' component={Login} />
          <Route path='/view' component={View} />
          <Route path='/settings' component={Settings} />
        </Switch>
      </main>
    );
  }
}

export default App;