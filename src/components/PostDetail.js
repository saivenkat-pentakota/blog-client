import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './PostDetail.css';
import editImg from '../Images/edit.png';
import deleteImg from '../Images/delete.png';

const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 5;
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/posts/${id}`)
            .then(response => setPost(response.data))
            .catch(error => console.error(error));
    }, [id]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/posts`, {
            params: { _page: currentPage, _limit: postsPerPage }
        })
            .then(response => setPosts(response.data))
            .catch(error => console.error(error));
    }, [currentPage]);

    const handleEditClick = () => {
        navigate(`/update-post/${id}`);
    };

    const handleDeleteClick = () => {
        axios.delete(`${process.env.REACT_APP_API_URL}/posts/${id}`)
            .then(() => {
                navigate('/posts');
            })
            .catch(error => console.error('Error deleting post:', error));
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    if (!post) return <div>Loading...</div>;

    return (
        <div className='PostDetailContainer'>
            <div className='button-container'>
                <div onClick={() => navigate('/posts')} className="navigate">← Back</div>
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
            <div className='pagination'>
                {[...Array(Math.ceil(posts.total / postsPerPage)).keys()].map(number => (
                    <button 
                        key={number + 1} 
                        onClick={() => handlePageChange(number + 1)} 
                        className={`pagination-button ${currentPage === number + 1 ? 'active' : ''}`}
                    >
                        {number + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default PostDetail;
