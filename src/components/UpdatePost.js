import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './UpdatePost.css';

const UpdatePost = ({ isAuthenticated, userId }) => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [currentImage, setCurrentImage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/posts/${id}`);
                const { title, content, imageFile } = response.data;
                setTitle(title);
                setContent(content);
                setCurrentImage(imageFile ? `${process.env.REACT_APP_API_URL}/uploads/${imageFile}` : '');
            } catch (error) {
                console.error('Error fetching post:', error);
                setErrorMessage('Failed to load post. Please try again.');
            }
        };

        fetchPost();
    }, [id]);

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
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
        formData.append('userId', userId); // Add userId to form data
        if (imageFile) {
            formData.append('imageFile', imageFile);
        }

        setErrorMessage('');

        try {
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/posts/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Update response:', response.data);
            setSuccessMessage('Post updated successfully!');
            navigate(`/posts/${id}`);
        } catch (error) {
            console.error('Error updating post:', error.response || error.message || error);
            setErrorMessage('Failed to update post. Please try again.');
        }
    };

    if (!isAuthenticated) {
        return <p className="error-message">Please Signup or Login to update the post.</p>;
    }

    return (
        <div className="update-post-form">
            <form onSubmit={handleSubmit}>
                <div onClick={() => navigate(`/posts/${id}`)} className="navigate">←</div>
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
                    {currentImage && (
                        <div className="current-image">
                            <p>Current Image:</p>
                            <img src={currentImage} alt="Current" />
                        </div>
                    )}
                </div>
                <button type="submit">Update Post</button>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
            </form>
        </div>
    );
};

export default UpdatePost;
