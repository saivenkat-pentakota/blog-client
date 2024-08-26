import React from 'react';
import { useAuth } from '../AuthContext'; // Import the context
import './User.css'; // Create a CSS file for styling

const User = () => {
  const { userEmail, isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <p>Please log in to view this page.</p>;
  }

  return (
    <div className="user-container">
      <h2>User Details</h2>
      <div className="user-details">
        <p>Email: {userEmail || 'No user information available.'}</p>
      </div>
    </div>
  );
};

export default User;
