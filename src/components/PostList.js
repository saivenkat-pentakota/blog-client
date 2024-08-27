import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './PostList.css';

const PostList = ({ isAuthenticated }) => {
    const [posts, setPosts] = useState([]);
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            if (!isAuthenticated) {
                return;
            }

            const apiUrl = process.env.REACT_APP_API_URL;
            console.log(`API URL: ${apiUrl}`);  // Debugging line

            if (!apiUrl) {
                setError('API URL is not defined');
                return;
            }

            try {
                const response = await axios.get(`${apiUrl}/posts`);
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error.response || error.message || error);
                setError('Failed to load posts');
            }
        };

        fetchPosts();
    }, [isAuthenticated]);

    const handleTitleClick = (id) => {
        setSelectedPostId(id);
    };

    if (!isAuthenticated) {
        return <p className="error-message">Please Signup or Login to see the data in Home Page.</p>;
    }

    return (
        <div className="PostListContainer">
            {error && <p className="error-message">{error}</p>}
            <div className="titles-section">
                <h2>Contents</h2>
                <ul className="titles-list">
                    {posts.map(post => (
                        <li
                            key={post.id}
                            onClick={() => handleTitleClick(post.id)}
                            className={`title-item ${selectedPostId === post.id ? 'active' : ''}`}
                        >
                            {post.title}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="posts-section">
                <h3>All Posts</h3>
                {posts.map(post => (
                    <div key={post.id} className="post">
                        {post.imageFile && (
                            <img 
                                src={`${process.env.REACT_APP_API_URL}/uploads/${post.imageFile}`} 
                                alt={post.title} 
                                className="post-image" 
                            />
                        )}
                        <h3>{post.title}</h3>
                        <p>{post.content.substring(0, 200)}...</p>
                        <Link to={`/posts/${post.id}`} className="read-more-link">Read More</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostList;
