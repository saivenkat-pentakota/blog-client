import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './PostDetail.css';

const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Post ID:", id);
        axios.get(`${process.env.REACT_APP_API_URL}/posts/${id}`)
            .then(response => setPost(response.data))
            .catch(error => console.error(error));
    }, [id]);

    if (!post) return <div>Loading...</div>;

    const handleEditClick = () => {
        navigate(`/update-post/${id}`);
    };

    return (
        <div className='PostDetailContainer'>
            <div className='button-container'>
                <div onClick={() => navigate('/posts')} className="navigate">←</div>
                <button onClick={handleEditClick} className="edit-button">Edit</button>
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
