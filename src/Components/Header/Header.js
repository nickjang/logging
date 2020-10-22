import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Header.css';

class Header extends Component {
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

  renderLoginHeader = () => {
    return (
        <header>
          <Link to='/welcome'><h1>Logo</h1></Link>
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
    if (this.props.type === 'main') return this.renderMainHeader();
    if (this.props.type === 'login') return this.renderLoginHeader();
    return this.renderWelcomeHeader();
  }
}

Header.defaultProps = {
  type: 'welcome'
}

Header.propTypes = {
  type: PropTypes.string.isRequired
}

export default Header;