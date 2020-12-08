import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import TokenService from '../../services/token-service';
import IdleService from '../../services/idle-service';
import './Header.css';
import userPic from '../../assets/images/user.png'

class Header extends Component {
  handleLogoutClick = () => {
    TokenService.clearAuthToken()
    /* when logging out, clear the callbacks to the refresh api and idle auto logout */
    TokenService.clearCallbackBeforeExpiry()
    IdleService.unRegisterIdleResets()
  }

  renderMainHeader = (view) => {
    return (
      <header className='header group-row'>
        <nav>
          <ul className='main-nav'>
            <li>
              <NavLink exact={true} to='/' activeClassName='active'>Log</NavLink>
            </li>
            <li className='view-page-link'>
              <NavLink to='/view' activeClassName='active'>View</NavLink>
            </li>
          </ul>
        </nav>
        <img className='user-pic' src={userPic} alt="A link to the user's account settings." />
        <Link onClick={this.handleLogoutClick} to='/'>
          Logout
        </Link>
        <Link to='/settings'>
          Settings
        </Link>
      </header>
    );
  }

  renderOverviewHeader = () => {
    return (
      <header className='header group-row'>
        <Link to='/overview'><h1>Logo</h1></Link>
        <nav>
          <ul>
            <li>
              <Link to='/sign-up'>Sign up</Link>
            </li>
            <li>
              <Link to='/login'>Log in</Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }

  render() {
    if (TokenService.hasAuthToken()) return this.renderMainHeader();
    return this.renderOverviewHeader();
  }
}

Header.defaultProps = {
  view: false
};

Header.propTypes = {
  view: PropTypes.bool
};

export default Header;