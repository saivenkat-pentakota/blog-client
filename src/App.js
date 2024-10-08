import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import CreatePost from './components/CreatePost';
import Signup from './components/Signup';
import Login from './components/Login';
import SideBar from './components/SideBar';
import Header from './components/Header';
import ProfilePage from './components/ProfilePage';
import UpdatePost from './components/UpdatePost';
import UserPosts from './components/UserPosts';
import './App.css'; 

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user data from the API
        const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/user`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response.ok) {
          const userData = await response.json();
          setIsAuthenticated(true);
          setUserId(userData.id); // Assuming userData contains the user ID
        } else {
          setIsAuthenticated(false);
          setUserId(null);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setIsAuthenticated(false);
        setUserId(null);
      }
    };

    if (localStorage.getItem('token')) {
      fetchUserData();
    } else {
      setIsAuthenticated(false);
      setUserId(null);
    }
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
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
              isSidebarOpen={isSidebarOpen} 
            />
            <div className="content-wrapper"> 
              <SideBar 
                isAuthenticated={isAuthenticated} 
                setIsAuthenticated={setIsAuthenticated} 
                isSidebarOpen={isSidebarOpen} 
                toggleSidebar={toggleSidebar} 
              />
              <main className="main-content">
                <Routes>
                  <Route path="/posts" element={<PostList isAuthenticated={isAuthenticated} />} />
                  <Route path="/posts/:id" element={<PostDetail />} />
                  <Route path="/create" element={<CreatePost isAuthenticated={isAuthenticated} userId={userId} />} />
                  <Route path="/update-post" element={<UpdatePost isAuthenticated={isAuthenticated} userId={userId} />} />
                  <Route path="/update-post/:id" element={<UpdatePost isAuthenticated={isAuthenticated} userId={userId} />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/settings" element={<div>Settings Page</div>} />
                  <Route path="*" element={<Navigate to="/posts" />} />
                  <Route path="/userspost" element={<UserPosts />} />
                </Routes>
              </main>
            </div>
          </>
        ) : (
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} setUserId={setUserId} />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}
      </div>
    </Router>
  );
};

export default App;
