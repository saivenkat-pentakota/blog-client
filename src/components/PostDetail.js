import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './PostDetail.css';

const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5003/posts/${id}`)
            .then(response => setPost(response.data))
            .catch(error => console.error(error));
    }, [id]);

    if (!post) return <div>Loading...</div>;

    return (
        <div className='container'>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            {post.imageFile && (
                <img src={`http://localhost:5003/uploads/${post.imageFile}`} alt={post.title} className="post-image" />
            )}
        </div>
    );
};

export default PostDetail;
