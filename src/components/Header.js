import React from 'react';
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
                    {isAuthenticated && (
                        <button className="btn-logout" onClick={handleLogout}>LOGOUT</button>
                    )}
                </nav>
            </header>
        </div>
    );
};

export default Header;
