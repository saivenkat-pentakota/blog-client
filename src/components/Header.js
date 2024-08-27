import React from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import js-cookie for handling cookies
import headerLogo from "../Images/The Write Path logo.png";
import './Header.css';

const Header = ({ isAuthenticated, setIsAuthenticated }) => {
    const handleLogout = () => {
        Cookies.remove('userEmail'); // Remove user email from cookies
        setIsAuthenticated(false); // Update the auth state to false
    };

    return (
        <div className='header-container'>
            <header className="header">
                <img className="header-logo" src={headerLogo} alt='header-logo'/>
                <nav className="header-nav">
                    {!isAuthenticated ? (
                        <>
                            <Link to="/login" className="btn-login">LOGIN</Link>
                            <Link to="/signup" className="btn-join">SIGN UP</Link>
                        </>
                    ) : (
                        <button className="btn-logout" onClick={handleLogout}>LOGOUT</button>
                    )}
                </nav>
            </header>
        </div>
    );
};

export default Header;
