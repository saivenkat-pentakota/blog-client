import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './PostList.css';

const PostList = ({ isAuthenticated }) => {
    const [posts, setPosts] = useState([]);
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPosts, setTotalPosts] = useState(0);
    const postsPerPage = 5;
    const navigate = useNavigate();

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
            if (response.data.posts && Array.isArray(response.data.posts)) {
                setPosts(response.data.posts);
                setTotalPosts(response.data.totalPosts);
            } else {
                setError('Unexpected data format');
            }
        } catch (error) {
            console.error('Error fetching posts:', error.response ? error.response.data : error.message);
            setError('Failed to load posts');
        }
    }, [isAuthenticated, postsPerPage]);

    useEffect(() => {
        fetchPosts(currentPage);
    }, [fetchPosts, currentPage]);

    const handleTitleClick = (id) => {
        setSelectedPostId(id);
        navigate(`/posts/${id}`); // Redirect to the post's detail page
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
                <div className="pagination">
                    {currentPage > 1 && (
                        <button onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
                    )}
                    {[...Array(totalPages)].map((_, index) => (
                        <button 
                            key={index + 1}
                            onClick={() => handlePageChange(index + 1)}
                            className={currentPage === index + 1 ? 'active' : ''}
                        >
                            {index + 1}
                        </button>
                    ))}
                    {currentPage < totalPages && (
                        <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
                    )}
                </div>
                {posts.length > 0 ? (
                    posts.map(post => (
                        <div key={post.id} className="post">
                            {post.imageFile && (
                                <img 
                                    src={`data:${post.imageFileType};base64,${post.imageFile}`} 
                                    alt={post.title} 
                                    className="post-image" 
                                />
                            )}
                            <h3>{post.title}</h3>
                            <p>{post.content.substring(0, 200)}...</p>
                            <Link to={`/posts/${post.id}`} className="read-more-link">Read More</Link>
                        </div>
                    ))
                ) : (
                    <p>No posts available</p>
                )}
                <div className="pagination">
                    {currentPage > 1 && (
                        <button onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
                    )}
                    {[...Array(totalPages)].map((_, index) => (
                        <button 
                            key={index + 1}
                            onClick={() => handlePageChange(index + 1)}
                            className={currentPage === index + 1 ? 'active' : ''}
                        >
                            {index + 1}
                        </button>
                    ))}
                    {currentPage < totalPages && (
                        <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
                    )}
                </div>
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
        </div>
    );
};

export default PostList;
