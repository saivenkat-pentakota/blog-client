import React from "react";
import { Link, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import homeImg from "../Images/home.png";
import bookImg from "../Images/book.png";
import fileImg from "../Images/file.png";
import writingImg from "../Images/writing.png";
import markImg from "../Images/mark.png";
import profileImg from "../Images/profile.png";
import logoutButtonIcon from "../Images/logout-button.png";
import "./SideBar.css";

const SideBar = ({
  isAuthenticated,
  setIsAuthenticated,
  isSidebarOpen,
  toggleSidebar,
}) => {
  const location = useLocation();

  const handleLinkClick = () => {
    if (typeof toggleSidebar === "function") {
      toggleSidebar();
    }
  };

  const handleLogout = () => {
    console.log("Logout triggered from Sidebar");
    console.log(`isAuthenticated: ${isAuthenticated}`);
    Cookies.remove("userEmail");
    setIsAuthenticated(false);
    console.log("isAuthenticated set to false");
  };

  return (
    <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
      <nav>
        <ul>
          <li className={location.pathname === "/posts" ? "active" : ""}>
            <Link to="/posts" onClick={handleLinkClick}>
              <img className="home-img" src={homeImg} alt="homeImgIcon" />
            </Link>
          </li>
          <li className={location.pathname === "/create" ? "active" : ""}>
            <Link to="/create" onClick={handleLinkClick}>
              <img src={bookImg} alt="bookImgIcon" />
            </Link>
          </li>
          <li className={location.pathname === "/file" ? "active" : ""}>
            <Link to="/file" onClick={handleLinkClick}>
              <img src={fileImg} alt="fileImgIcon" />
            </Link>
          </li>
          <li className={location.pathname === "/writing" ? "active" : ""}>
            <Link to="/writing" onClick={handleLinkClick}>
              <img src={writingImg} alt="writingImgIcon" />
            </Link>
          </li>
          <li className={location.pathname === "/mark" ? "active" : ""}>
            <Link to="/mark" onClick={handleLinkClick}>
              <img src={markImg} alt="markImgIcon" />
            </Link>
          </li>
          {isAuthenticated && (
            <li className={location.pathname === "/profile" ? "active" : ""}>
              <Link to="/profile" onClick={handleLinkClick}>
                <img src={profileImg} alt="profileImgIcon" />
              </Link>
            </li>
          )}
        </ul>
      </nav>
      {isAuthenticated && (
        <div className="sidebar-logout">
          <img
            src={logoutButtonIcon}
            alt="logout"
            className="logout-button"
            onClick={() => {
              console.log("Inline function triggered");
              handleLogout();
            }}
          />
        </div>
      )}
    </aside>
  );
};

export default SideBar;
