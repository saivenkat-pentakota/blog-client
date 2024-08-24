import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './PostList.css';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [selectedPostId, setSelectedPostId] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5003/posts')
            .then(response => setPosts(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleTitleClick = (id) => {
        setSelectedPostId(id);
    };

    return (
        <div className="container">
            <div className="titles-section">
                <h2>Contents</h2>
                <ul className="titles-list">
                    {posts.map(post => (
                        <li
                            key={post._id}
                            onClick={() => handleTitleClick(post._id)}
                            className={`title-item ${selectedPostId === post._id ? 'active' : ''}`}
                        >
                            {post.title}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="posts-section">
                <h3>All Posts</h3>
                {posts.map(post => (
                    <div key={post._id} className="post">
                        {post.imageFile && (
                            <img src={`http://localhost:5003/uploads/${post.imageFile}`} alt={post.title} className="post-image" />
                        )}
                        <h3>{post.title}</h3>
                        <p>{post.content.substring(0, 200)}...</p>
                        <Link to={`/posts/${post._id}`} className="read-more-link">Read More</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostList;
