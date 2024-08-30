import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreatePost.css';

const CreatePost = ({ isAuthenticated }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false); // For loading spinner
    const navigate = useNavigate(); 

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileType = /jpeg|jpg|png|gif/.test(file.type);
            const fileSize = file.size <= 5 * 1024 * 1024; // 5MB limit

            if (!fileType) {
                setErrorMessage('Invalid file type. Please upload an image (jpeg, jpg, png, gif).');
                return;
            }

            if (!fileSize) {
                setErrorMessage('File size too large. Please upload an image smaller than 5MB.');
                return;
            }

            setImageFile(file);
            setErrorMessage(''); // Clear error message if file is valid
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !content) {
            setErrorMessage('Both title and content are required.');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        if (imageFile) {
            formData.append('imageFile', imageFile);
        }

        setErrorMessage('');
        setLoading(true); // Start loading spinner

        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/posts`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setSuccessMessage('Post created successfully!');
            setTitle('');
            setContent('');
            setImageFile(null);

            // Clear success message after 5 seconds
            setTimeout(() => setSuccessMessage(''), 5000);

            // Navigate to the /posts page after successful post creation
            navigate('/posts');
        } catch (error) {
            console.error('Error creating post:', error.response?.data?.message || error.message || error);
            setErrorMessage('Failed to create post. Please try again.');

            // Clear error message after 5 seconds
            setTimeout(() => setErrorMessage(''), 5000);
        } finally {
            setLoading(false); // Stop loading spinner
        }
    };

    if (!isAuthenticated) {
        return <p className="error-message">Please Signup or Login to create a post.</p>;
    }

    return (
        <div className="create-post-form">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input 
                        type="text" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        required 
                    />
                </div>
                <div className="content">
                    <label>Content:</label>
                    <textarea 
                        value={content} 
                        onChange={(e) => setContent(e.target.value)} 
                        required 
                    ></textarea>
                </div>
                <div className="image-upload">
                    <label>Upload Image:</label>
                    <input 
                        type="file" 
                        onChange={handleFileChange} 
                    />
                </div>
                <button type="submit" disabled={loading}>Create Post</button>
                {loading && <p className="loading-message">Creating post...</p>}
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
            </form>
        </div>
    );
};

export default CreatePost;
