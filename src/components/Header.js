import React from 'react';
import { Link } from 'react-router-dom';
import headerLogo from "../Images/The Write Path logo.png";
import './Header.css';

const Header = () => {
  return (
    <div className='header-container'>
      <header className="header">
        <img className="header-logo" src={headerLogo} alt='header-logo'/>
        <nav className="header-nav">
          <Link to="/login">
            <button className="btn-login">LOGIN</button>
          </Link>
          <Link to="/signup">
            <button className="btn-join">SIGN UP</button>
          </Link>
        </nav>
      </header>
    </div>
  );
};

export default Header;
