import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import CreatePost from './components/CreatePost';
import Signup from './components/Signup';
import Login from './components/Login';
import SideBar from './components/SideBar';
import Header from './components/Header';
import ProfilePage from './components/ProfilePage'; // Import the ProfilePage component

import './App.css'; 

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="app-container">
        <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        <div className="content-wrapper">
          <SideBar isAuthenticated={isAuthenticated} /> {/* Pass the isAuthenticated state */}
          <main className="main-content">
            <Routes>
              <Route path="/" element={<PostList />} />
              <Route path="/posts/:id" element={<PostDetail />} />
              <Route path="/create" element={<CreatePost />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
              <Route path="/profile" element={isAuthenticated ? <ProfilePage /> : <div>Please log in</div>} />
              <Route path="/settings" element={<div>Settings Page</div>} />
              <Route path="*" element={<div>404 Not Found</div>} />
            </Routes>
          </main>
        </div>
        <footer>
          <p>&copy; 2024 My Blog</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
