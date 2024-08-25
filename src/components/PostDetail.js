import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './PostDetail.css';

const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`https://blog-app-c2bf.onrender.com/posts/${id}`)
            .then(response => setPost(response.data))
            .catch(error => {
                console.error('Error fetching post:', error);
                setError('Failed to load post.');
            });
    }, [id]);

    if (error) return <div>{error}</div>;
    if (!post) return <div>Loading...</div>;

    return (
        <div className='container'>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            {post.imageFile && (
                <img 
                    src={`https://blog-app-c2bf.onrender.com/uploads/${post.imageFile}`} 
                    alt={post.title} 
                    className="post-image" 
                />
            )}
        </div>
    );
};

export default PostDetail;
