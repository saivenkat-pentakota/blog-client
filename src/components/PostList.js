import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './PostList.css';

const PostList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5002/posts')
            .then(response => setPosts(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div className="container">
            <h2>Blog Posts</h2>
            {posts.map(post => (
                <div key={post._id} className="post">
                    <h3>{post.title}</h3>
                    <p>{post.content.substring(0, 500)}...</p>
                    <Link to={`/posts/${post._id}`}>Read More</Link>
                </div>
            ))}
        </div>
    );
};

export default PostList;

