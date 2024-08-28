import React from "react";
import { Link, useLocation } from "react-router-dom";
import homeImg from '../Images/home.png';
import bookImg from '../Images/book.png';
import closedBookImg from '../Images/closedBook.png';
import fileImg from '../Images/file.png';
import writingImg from '../Images/writing.png';
import markImg from '../Images/mark.png';
import profileImg from '../Images/profile.png';
import './SideBar.css';

const SideBar = ({ isAuthenticated, isSidebarOpen, toggleSidebar }) => {
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
            <p>Home</p>
          </li>
          <li className={location.pathname === "/create" ? "active" : ""}>
            <Link to="/create">
              <img src={bookImg} alt="bookImgIcon"/>
            </Link>
            <p>Create Post</p>
          </li>
          <li className={location.pathname === "/bookdetails" ? "active" : ""}>
            <Link to="/bookdetails">
              <img src={closedBookImg} alt="bookdetailsImgIcon"/>
            </Link>
            <p>My Posts</p>
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
              <p>Profile</p>
            </li>
          )}
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
