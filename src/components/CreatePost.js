import React, { useState } from 'react';
import axios from 'axios';
import './CreatePost.css';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic client-side validation
        if (!title || !content) {
            setErrorMessage('Both title and content are required.');
            return;
        }

        // Clear any previous error messages
        setErrorMessage('');

        axios.post('http://localhost:5002/posts', { title, content })
            .then(response => {
                setSuccessMessage('Post created successfully!');
                setTitle('');
                setContent('');
                
                // Optional: Show a pop-out message
                setTimeout(() => {
                    alert('Post created successfully!');
                }, 500);
            })
            .catch(error => {
                console.error(error);
                setErrorMessage('Failed to create post. Please try again.');
            });
    };

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
                <div>
                    <label>Content:</label>
                    <textarea 
                        value={content} 
                        onChange={(e) => setContent(e.target.value)} 
                        required 
                    ></textarea>
                </div>
                <button type="submit">Create Post</button>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
            </form>
        </div>
    );
};

export default CreatePost;
