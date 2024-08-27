import React from 'react';
import Cookies from 'js-cookie'; // Import js-cookie
import { useNavigate } from 'react-router-dom';

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
            <p>Email: {userEmail}</p>
            {/* Add other user profile details here */}
        </div>
    );
};

export default ProfilePage;
