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
          <Link to="/login" className="btn-login">LOGIN</Link>
          <Link to="/signup" className="btn-join">SIGN UP</Link>
        </nav>
      </header>
    </div>
  );
};

export default Header;
