import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import CreatePost from './components/CreatePost';
import Signup from './components/Signup';
import Login from './components/Login';
import SideBar from './components/SideBar';
import Header from './components/Header';
import ProfilePage from './components/ProfilePage';

import './App.css'; 
import UpdatePost from './components/UpdatePost';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div className="app-container">
        {isAuthenticated ? (
          <>
            <Header 
              isAuthenticated={isAuthenticated} 
              setIsAuthenticated={setIsAuthenticated} 
              toggleSidebar={toggleSidebar} 
            />
            <div className="content-wrapper"> 
              <SideBar 
                isAuthenticated={isAuthenticated} 
                isSidebarOpen={isSidebarOpen} 
                toggleSidebar={toggleSidebar} 
              />
              <main className="main-content">
                <Routes>
                  <Route path="/posts" element={<PostList isAuthenticated={isAuthenticated} />}/>
                  <Route path="/posts/:id" element={<PostDetail />} />
                  <Route path="/create" element={<CreatePost isAuthenticated={isAuthenticated} />} />
                  <Route path="/update-post/:id" element={<UpdatePost isAuthenticated={isAuthenticated} />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/settings" element={<div>Settings Page</div>} />
                  <Route path="*" element={<Navigate to="/posts" />} />
                </Routes>
              </main>
            </div>
            <footer>
              <p>&copy; 2024 My Blog</p>
            </footer>
          </>
        ) : (
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}
      </div>
    </Router>
  );
};

export default App;
