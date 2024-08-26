import React from 'react';
import { useLocation } from 'react-router-dom';
import './User.css'; // Create a CSS file for styling

const User = () => {
  const location = useLocation();
  const email = location.state?.email; // Get email from state

  return (
    <div className="user-container">
      <h2>User Details</h2>
      {email ? (
        <div className="user-details">
          <p>Email: {email}</p>
        </div>
      ) : (
        <p>No user information available.</p>
      )}
    </div>
  );
};

export default User;
