import React, { useState } from 'react';
import axios from 'axios';
import './CreatePost.css';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
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

        axios.post('https://blog-client-mptr.onrender.com/posts', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then(response => {
            setSuccessMessage('Post created successfully!');
            setTitle('');
            setContent('');
            setImageFile(null);
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
                <button type="submit">Create Post</button>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
            </form>
        </div>
    );
};

export default CreatePost;
