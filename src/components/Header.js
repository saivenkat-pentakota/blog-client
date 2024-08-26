// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext'; 
import headerLogo from "../Images/The Write Path logo.png";
import './Header.css';

const Header = () => {
  const { isLoggedIn, logout } = useAuth(); 

  return (
    <div className='header-container'>
      <header className="header">
        <img className="header-logo" src={headerLogo} alt='header-logo'/>
        <nav className="header-nav">
          {isLoggedIn ? (
            <button onClick={logout} className="btn-logout">LOGOUT</button>
          ) : (
            <>
              <Link to="/login">
                <button className="btn-login">LOGIN</button>
              </Link>
              <Link to="/signup">
                <button className="btn-join">SIGN UP</button>
              </Link>
            </>
          )}
        </nav>
      </header>
    </div>
  );
};

export default Header;
