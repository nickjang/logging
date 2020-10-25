import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LoggingContext from '../../Context/LoggingContext';
import './Header.css';

class Header extends Component {
  static contextType = LoggingContext;

  renderMainHeader = () => {
    return (
      <header>
        <nav>
          <h1><Link to='/'>Logo</Link></h1>
          <Link to='/view'>View</Link>
          <hr />
        </nav>
          <Link to='/settings'>
            <img src='' alt="A link to the user's account settings." />
          </Link>
      </header>
    );
  }

  renderWelcomeHeader = () => {
    return (
        <header>
          <Link to='/welcome'><h1>Logo</h1></Link>
          <nav>
            <Link to='/login'>Login</Link>
          </nav>
        </header>
    );
  }

  render() {
    if (this.context.account.email) return this.renderMainHeader();
    return this.renderWelcomeHeader();
  }
}

export default Header;