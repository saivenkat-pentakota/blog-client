import React from "react";
import { Link, useLocation } from "react-router-dom";
import homeImg from '../Images/home.png';
import bookImg from '../Images/book.png';
import fileImg from '../Images/file.png';
import writingImg from '../Images/writing.png';
import markImg from '../Images/mark.png';
import profileImg from '../Images/profile.png';
import logoutButtonIcon from '../Images/logout-button.png';
import './SideBar.css';

const SideBar = ({ isAuthenticated, isSidebarOpen, toggleSidebar, handleLogout }) => {
  const location = useLocation();

  return (
    <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
      <div className="close-btn" onClick={toggleSidebar}>&times;</div>
      <nav>
        <ul>
          <li className={location.pathname === "/posts" ? "active" : ""}>
            <Link to="/posts">
              <img className="home-img" src={homeImg} alt="homeImgIcon"/>
            </Link>
          </li>
          <li className={location.pathname === "/create" ? "active" : ""}>
            <Link to="/create">
              <img src={bookImg} alt="bookImgIcon"/>
            </Link>
          </li>
          <li className={location.pathname === "/file" ? "active" : ""}>
            <Link to="/file">
              <img src={fileImg} alt="fileImgIcon"/>
            </Link>
          </li>
          <li className={location.pathname === "/writing" ? "active" : ""}>
            <Link to="/writing">
              <img src={writingImg} alt="writingImgIcon"/>
            </Link>
          </li>
          <li className={location.pathname === "/mark" ? "active" : ""}>
            <Link to="/mark">
              <img src={markImg} alt="markImgIcon"/>
            </Link>
          </li>
          {isAuthenticated && (
            <li className={location.pathname === "/profile" ? "active" : ""}>
              <Link to="/profile">
                <img src={profileImg} alt="profileImgIcon"/>
              </Link>
            </li>
          )}
        </ul>
      </nav>
      {isAuthenticated && (
        <div className="sidebar-logout">
          <img 
            src={logoutButtonIcon} 
            alt='logout' 
            className='action-image' 
            onClick={handleLogout} 
          />
        </div>
      )}
    </aside>
  );
};

export default SideBar;
