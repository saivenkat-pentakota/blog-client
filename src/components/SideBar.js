// src/components/SideBar.js
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from '../AuthContext'; // Import the context
import homeImg from '../Images/home.png';
import bookImg from '../Images/book.png';
import closedBookImg from '../Images/closedBook.png';
import fileImg from '../Images/file.png';
import writingImg from '../Images/writing.png';
import userImg from '../Images/user.png';
import markImg from '../Images/mark.png';
import profileImg from '../Images/profile.png';
import './SideBar.css';

const SideBar = () => {
  const location = useLocation();
  const { isLoggedIn, logout } = useAuth(); // Use the context

  return (
    <aside className="sidebar">
      <nav>
        <ul>
          <li className={location.pathname === "/" ? "active" : ""}>
            <Link to="/">
              <img className="home-img" src={homeImg} alt="homeImgIcon"/>
            </Link>
          </li>
          <li className={location.pathname === "/create" ? "active" : ""}>
            <Link to="/create">
              <img src={bookImg} alt="bookImgIcon"/>
            </Link>
          </li>
          <li className={location.pathname === "/bookdetails" ? "active" : ""}>
            <Link to="/bookdetails">
              <img src={closedBookImg} alt="bookdetailsImgIcon"/>
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
          <li className={location.pathname === "/user" ? "active" : ""}>
            <Link to="/user">
              <img src={userImg} alt="userImgIcon"/>
            </Link>
          </li>
          <li className={location.pathname === "/mark" ? "active" : ""}>
            <Link to="/mark">
              <img src={markImg} alt="markImgIcon"/>
            </Link>
          </li>
          <li className={location.pathname === "/profile" ? "active" : ""}>
            <Link to="/profile">
              <img src={profileImg} alt="profileImgIcon"/>
            </Link>
          </li>
          {isLoggedIn ? (
            <li>
              <button onClick={logout} className="btn-logout">LOGOUT</button>
            </li>
          ) : (
            <>
              <li className={location.pathname === "/login" ? "active" : ""}>
                <Link to="/login">
                  <img src={userImg} alt="loginImgIcon"/>
                </Link>
              </li>
              <li className={location.pathname === "/signup" ? "active" : ""}>
                <Link to="/signup">
                  <img src={userImg} alt="signupImgIcon"/>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
