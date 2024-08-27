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
        axios.get(`https:/blog-client-mptr.onrender.com/posts/${id}`)
            .then(response => setPost(response.data))
            .catch(error => console.error(error));
    }, [id]);

    if (!post) return <div>Loading...</div>;

    return (
        <div className='PostDetailContainer'>
            <div onClick={() => navigate('/')} className="navigate">←</div>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            {post.imageFile && (
                <img src={`https:/blog-client-mptr.onrender.com/uploads/${post.imageFile}`} alt={post.title} className="post-image" />
            )}
        </div>
    );
};

export default PostDetail;
