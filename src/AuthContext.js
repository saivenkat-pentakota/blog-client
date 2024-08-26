import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const res = await axios.get('/api/auth/check', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data.isLoggedIn) {
          setIsLoggedIn(true);
          setUserEmail(res.data.email || '');
        } else {
          setIsLoggedIn(false);
          setUserEmail('');
        }
      } catch (error) {
        setIsLoggedIn(false);
        setUserEmail('');
      }
    };

    if (token) {
      checkLoginStatus();
    } else {
      setIsLoggedIn(false);
      setUserEmail('');
    }
  }, [token]);

  const login = (token, email) => {
    setToken(token);
    setIsLoggedIn(true);
    setUserEmail(email);
  };

  const logout = async () => {
    try {
      await axios.post('/api/auth/logout', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setToken('');
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
