// src/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const res = await axios.get('/api/auth/check', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setIsLoggedIn(res.data.isLoggedIn);
        setUserEmail(res.data.email || '');
      } catch (error) {
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  const login = (token, email) => {
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
    setUserEmail(email);
  };

  const logout = async () => {
    try {
      await axios.post('/api/auth/logout');
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      setUserEmail('');
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
