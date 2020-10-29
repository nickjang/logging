import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import LoggingContext from '../../Context/LoggingContext';
import './Header.css';
import userPic  from '../../images/user.png'

class Header extends Component {
  static contextType = LoggingContext;

  renderMainHeader = (view) => {
    return (
      <header className='header group-row'>
        <nav>
          <ul>
            <li>
              <h1><Link to='/'>Logo</Link></h1>
            </li>
            <li className='view-page-link'>
              {view ?
                <h2><Link to='/view'>View</Link></h2> :
                <Link to='/view'>View</Link>}
            </li>
          </ul>
          <hr />
        </nav>
        <Link to='/settings' className='user-pic'>
          <img src={userPic} alt="A link to the user's account settings." />
        </Link> 
      </header>
    );
  }

  renderWelcomeHeader = () => {
    return (
      <header className='header group-row'>
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

Header.defaultProps = {
  view: false
};

Header.propTypes = {
  view: PropTypes.bool
};

export default Header;