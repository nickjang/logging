import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import TokenService from '../../services/token-service';
import IdleService from '../../services/idle-service';
import './Header.css';

class Header extends Component {
  handleLogoutClick = () => {
    TokenService.clearAuthToken();
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets();
    window.location.reload();
  }

  renderMainHeader = () => {
    return (
      <header>
        <h1>Logger</h1>
        <nav>
          <ul>
            <div className='main-link-container'>
              <li className='main-link'>
                <NavLink exact={true} to='/' activeClassName='active'>Log</NavLink>
              </li>
              <li className='main-link'>
                <NavLink to='/view' activeClassName='active'>View</NavLink>
              </li>
            </div>
            <div className='right-link-container'>
              <li>
                <NavLink onClick={this.handleLogoutClick} to='/'>Logout</NavLink>
              </li>
              <li>
                <NavLink to='/settings'>Settings</NavLink>
              </li>
            </div>
          </ul>
        </nav>
      </header>
    );
  }

  renderOverviewHeader = () => {
    return (
      <header>
        <h1>
          <Link to='/overview'>Logger</Link>
        </h1>
        <nav>
          <ul>
            <div className='right-link-container'>
              <li>
                <NavLink to='/sign-up'>Sign up</NavLink>
              </li>
              <li>
                <NavLink to='/login'>Log in</NavLink>
              </li>
            </div>
          </ul>
        </nav>
      </header>
    );
  }

  render() {
    return TokenService.hasAuthToken()
      ? this.renderMainHeader()
      : this.renderOverviewHeader();
  }
}

export default Header;