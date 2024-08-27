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
        // Use environment variable for API URL
        axios.get(`${process.env.REACT_APP_API_URL}/posts/${id}`)
            .then(response => setPost(response.data))
            .catch(error => console.error(error));
    }, [id]);

    if (!post) return <div>Loading...</div>;

    return (
        <div className='PostDetailContainer'>
            <div onClick={() => navigate('/posts')} className="navigate">←</div>
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
