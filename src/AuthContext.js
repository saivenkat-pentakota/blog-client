import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [token, setToken] = useState(localStorage.getItem('authToken') || '');

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = localStorage.getItem('authToken'); // Retrieve token
      console.log('Checking login status with token:', token); // Log token to debug
  
      if (token) {
        try {
          const res = await axios.get('/api/auth/check', {
            headers: { Authorization: `Bearer ${token}` }
          });
          console.log('Login Status Response:', res.data);
          if (res.data.isLoggedIn) {
            setIsLoggedIn(true);
            setUserEmail(res.data.email || '');
          } else {
            setIsLoggedIn(false);
            setUserEmail('');
            localStorage.removeItem('authToken'); // Remove invalid token
          }
        } catch (error) {
          setIsLoggedIn(false);
          setUserEmail('');
          localStorage.removeItem('authToken'); // Remove invalid token
          console.error('Error checking login status:', error); // Detailed error logging
        }
      } else {
        setIsLoggedIn(false);
        setUserEmail('');
      }
    };
  
    checkLoginStatus();
  }, [token]);
  

  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      const { token } = response.data;
      if (token) {
        setToken(token);
        localStorage.setItem('authToken', token); // Store token in localStorage
        console.log('Token stored in localStorage:', localStorage.getItem('authToken')); // Check if token is stored correctly
  
        // Fetch user details
        const userResponse = await axios.get('/api/auth/user', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setIsLoggedIn(true);
        setUserEmail(userResponse.data.email || '');
      }
    } catch (error) {
      console.error('Login Error:', error);
    }
  };
  
  
  const logout = async () => {
    try {
      await axios.post('/api/auth/logout', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setToken('');
      setIsLoggedIn(false);
      setUserEmail('');
      localStorage.removeItem('authToken');
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
