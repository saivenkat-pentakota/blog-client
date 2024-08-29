import React from 'react';
import Cookies from 'js-cookie';
import logoutButtonIcon from '../Images/logout-button.png';
import './Header.css';

const Header = ({ isAuthenticated, setIsAuthenticated, toggleSidebar }) => {
    const handleLogout = () => {
        Cookies.remove('userEmail');
        setIsAuthenticated(false);
    };

    return (
        <div className='header-container'>
            <header className="header">
                <nav className="header-nav">
                    <div className="hamburger-menu" onClick={toggleSidebar}>
                        <span className="hamburger-icon">&#9776;</span>
                    </div>
                    {isAuthenticated && (
                        <img 
                            src={logoutButtonIcon} 
                            alt='logout' 
                            className='action-image button-logout' 
                            onClick={handleLogout} 
                        />
                    )}
                </nav>
            </header>
        </div>
    );
};

export default Header;
