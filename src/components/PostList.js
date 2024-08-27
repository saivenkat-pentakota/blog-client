import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import './PostList.css';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [selectedPostId, setSelectedPostId] = useState(null);

    useEffect(() => {
        axios.get('https://blog-client-mptr.onrender.com/posts')
            .then(response => setPosts(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleTitleClick = (id) => {
        setSelectedPostId(id);
    };

    return (
        <div className="PostListContainer">
            <div className="titles-section">
                <h2>Contents</h2>
                <ul className="titles-list">
                    {posts.map(post => (
                        <li
                            key={uuidv4()} 
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
                    <div key={uuidv4()} className="post">
                        {post.imageFile && (
                            <img src={`https://blog-client-mptr.onrender.com/uploads/${post.imageFile}`} alt={post.title} className="post-image" />
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
