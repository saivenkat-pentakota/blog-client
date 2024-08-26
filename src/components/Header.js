import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext'; 
import headerLogo from "../Images/The Write Path logo.png";
import './Header.css';

const Header = () => {
  const { isLoggedIn, logout } = useAuth(); 

  // Function to handle logout and redirect if needed
  const handleLogout = async () => {
    await logout();
    // Optionally redirect to home or login page after logout
    // For example: window.location.href = '/login';
  };

  return (
    <div className='header-container'>
      <header className="header">
        <img className="header-logo" src={headerLogo} alt='header-logo'/>
        <nav className="header-nav">
          {isLoggedIn ? (
            <button onClick={handleLogout} className="btn-logout">LOGOUT</button>
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
