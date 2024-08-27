import React from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie'; 
import './Header.css';

const Header = ({ isAuthenticated, setIsAuthenticated }) => {
    const handleLogout = () => {
        Cookies.remove('userEmail'); 
        setIsAuthenticated(false); 
    };

    return (
        <div className='header-container'>
            <header className="header">
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
