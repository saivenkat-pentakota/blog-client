import React from 'react';
import Cookies from 'js-cookie';
import logoutButtonIcon from '../Images/logout-button.png';
import './Header.css';

const Header = ({ isAuthenticated, setIsAuthenticated, toggleSidebar, isSidebarOpen }) => {
    const handleLogout = () => {
        console.log("Logout triggered from Header");
        Cookies.remove('userEmail');
        setIsAuthenticated(false);
    };

    return (
        <div className='header-container'>
            <header className="header">
                <nav className="header-nav">
                    <div className="hamburger-menu" onClick={toggleSidebar}>
                        <span className="hamburger-icon">
                            {isSidebarOpen ? '\u00D7' : '\u2630'}
                        </span>
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
