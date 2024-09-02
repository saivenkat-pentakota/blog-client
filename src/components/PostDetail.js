import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './PostDetail.css';
import editImg from '../Images/edit.png';
import deleteImg from '../Images/delete.png';

const PostDetail = ({ userId, isAuthenticated }) => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/posts/${id}`);
                setPost(response.data);
            } catch (err) {
                console.error('Error fetching post:', err);
                setError('Failed to load post.');
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    const handleEditClick = () => {
        navigate(`/update-post/${id}`);
    };

    const handleDeleteClick = () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this post? This action cannot be undone.');
        if (confirmDelete) {
            axios.delete(`${process.env.REACT_APP_API_URL}/posts/${id}`)
                .then(() => {
                    navigate('/posts');
                })
                .catch(err => {
                    console.error('Error deleting post:', err);
                    setError('Failed to delete post.');
                });
        }
    };

    if (loading) return <div>Loading...</div>;

    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className='PostDetailContainer'>
            <div className='button-container'>
                <div onClick={() => navigate('/posts')} className="navigate">←</div>
                {isAuthenticated && post.userId === userId && (
                    <div className='action-buttons'>
                        <img 
                            src={editImg} 
                            alt='Edit' 
                            className='action-image edit-image' 
                            onClick={handleEditClick} 
                        />
                        <img 
                            src={deleteImg} 
                            alt='Delete' 
                            className='action-image delete-image' 
                            onClick={handleDeleteClick} 
                        />
                    </div>
                )}
            </div>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            {post.imageFile && (
                <img 
                    src={`${process.env.REACT_APP_API_URL}/uploads/${post.imageFile}`} 
                    alt={post.title} 
                    className="post-image" 
                />
            )}
        </div>
    );
};

export default PostDetail;
