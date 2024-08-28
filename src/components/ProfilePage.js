import React from 'react';
import Cookies from 'js-cookie'; 
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css'; 

const ProfilePage = () => {
    const navigate = useNavigate();

    // Fetch the user's email from cookies
    const userEmail = Cookies.get('userEmail');

    // Redirect to login if userEmail is not present
    if (!userEmail) {
        navigate('/login');
        return null;
    }

    return (
        <div className="profile-page">
            <h2>Profile</h2>
            <div className="profile-info">
                <p>Email: {userEmail}</p>
                
            </div>
        </div>
    );
};

export default ProfilePage;
