import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './PostList.css';

const PostList = ({ isAuthenticated }) => {
    const [posts, setPosts] = useState([]);
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPosts, setTotalPosts] = useState(0);
    const postsPerPage = 5;

    const fetchPosts = useCallback(async (page) => {
        if (!isAuthenticated) {
            return;
        }

        const apiUrl = process.env.REACT_APP_API_URL;
        console.log(`API URL: ${apiUrl}`);

        if (!apiUrl) {
            setError('API URL is not defined');
            return;
        }

        try {
            const response = await axios.get(`${apiUrl}/posts?page=${page}&limit=${postsPerPage}`);
            console.log(response.data); 
            if (Array.isArray(response.data.posts)) {
                setPosts(response.data.posts);
                setTotalPosts(response.data.totalPosts);
            } else {
                setError('Unexpected data format');
            }
        } catch (error) {
            console.error('Error fetching posts:', error.response || error.message || error);
            setError('Failed to load posts');
        }
    }, [isAuthenticated, postsPerPage]);

    useEffect(() => {
        fetchPosts(currentPage);
    }, [fetchPosts, currentPage]);

    const handleTitleClick = (id) => {
        setSelectedPostId(id);
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const totalPages = Math.ceil(totalPosts / postsPerPage);

    if (!isAuthenticated) {
        return <p className="error-message">Please Signup or Login to see the data in Home Page.</p>;
    }

    return (
        <div className="PostListContainer">
            {error && <p className="error-message">{error}</p>}
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

            <div className="pagination">
                {currentPage > 1 && (
                    <button onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
                )}
                {currentPage < totalPages && (
                    <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
                )}
            </div>
        </div>
    );
};

export default PostList;
