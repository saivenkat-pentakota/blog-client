import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreatePost.css';

const CreatePost = ({ isAuthenticated, userId }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileType = /jpeg|jpg|png|gif/.test(file.type);
            const fileSize = file.size <= 5 * 1024 * 1024;

            if (!fileType) {
                setErrorMessage('Invalid file type. Please upload an image (jpeg, jpg, png, gif).');
                setImageFile(null);
                setImagePreview('');
                return;
            }

            if (!fileSize) {
                setErrorMessage('File size too large. Please upload an image smaller than 5MB.');
                setImageFile(null);
                setImagePreview('');
                return;
            }

            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
            setErrorMessage('');
        } else {
            setImageFile(null);
            setImagePreview('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Check for required fields
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
        setLoading(true);
    
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
            setImagePreview('');
    
            // Redirect to a different page, e.g., posts list
            navigate('/posts');
        } catch (error) {
            console.error('Error creating post:', error.response?.data?.message || error.message || error);
            setErrorMessage('Failed to create post. Please try again.');
    
            setTimeout(() => setErrorMessage(''), 5000);
        } finally {
            setLoading(false);
        }
    };
    

    if (!isAuthenticated) {
        return <p className="error-message">Please sign up or log in to create a post.</p>;
    }

    return (
        <div className="create-post-form">
            <form onSubmit={handleSubmit}>
                <div onClick={() => navigate('/posts')} className="navigate">←</div>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input 
                        id="title"
                        type="text" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        required 
                    />
                </div>
                <div className="content">
                    <label htmlFor="content">Content:</label>
                    <textarea 
                        id="content"
                        value={content} 
                        onChange={(e) => setContent(e.target.value)} 
                        required 
                    ></textarea>
                </div>
                <div className="image-upload">
                    <label htmlFor="imageFile">Upload Image (optional):</label>
                    <input 
                        id="imageFile"
                        type="file" 
                        accept="image/*"
                        onChange={handleFileChange} 
                    />
                    {imagePreview && (
                        <div className="image-preview">
                            <img src={imagePreview} alt="Preview" />
                        </div>
                    )}
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
                <button type="submit" disabled={loading}>
                    {loading ? 'Creating Post...' : 'Create Post'}
                </button>
            </form>
        </div>
    );
};

export default CreatePost;
