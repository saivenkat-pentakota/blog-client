import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import headerLogo from "../Images/The Write Path logo.png";
import './Header.css';

const Header = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any stored authentication data (e.g., tokens)
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <div className='header-container'>
      <header className="header">
        <img className="header-logo" src={headerLogo} alt='header-logo'/>
        <nav className="header-nav">
          {isAuthenticated ? (
            <button onClick={handleLogout} className="btn-logout">LOGOUT</button>
          ) : (
            <>
              <Link to="/login" className="btn-login">LOGIN</Link>
              <Link to="/signup" className="btn-join">SIGN UP</Link>
            </>
          )}
        </nav>
      </header>
    </div>
  );
};

export default Header;
