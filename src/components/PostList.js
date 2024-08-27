import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './PostList.css';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get('https:/blog-client-mptr.onrender.com/posts') 
            .then(response => setPosts(response.data))
            .catch(error => {
                console.error('Error fetching posts:', error);
                setError('Failed to load posts');
            });
    }, []);

    const handleTitleClick = (id) => {
        setSelectedPostId(id);
    };

    return (
        <div className="PostListContainer">
            {error && <p className="error-message">{error}</p>}
            <div className="titles-section">
                <h2>Contents</h2>
                <ul className="titles-list">
                    {posts.map(post => (
                        <li
                            key={post.id}  // Use post.id for key
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
                    <div key={post.id} className="post"> {/* Use post.id for key */}
                        {post.imageFile && (
                            <img 
                                src={`https:/blog-client-mptr.onrender.com/uploads/${post.imageFile}`} 
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
