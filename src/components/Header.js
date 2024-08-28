// Header.js
import React from 'react';
import Cookies from 'js-cookie'; 
import './Header.css';
import './SideBar.css'; 

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
                        <button className="btn-logout" onClick={handleLogout}>LOGOUT</button>
                    )}
                </nav>
            </header>
        </div>
    );
};

export default Header;
