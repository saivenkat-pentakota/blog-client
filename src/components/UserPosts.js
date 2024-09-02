import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UserPosts.css'; 

const UserPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user posts
    const fetchUserPosts = async () => {
      try {
        const response = await axios.get('/usersposts');
        setPosts(response.data.posts);
      } catch (err) {
        setError('Failed to fetch posts. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, []);

  const handleEdit = (postId) => {
    navigate(`/edit/${postId}`); 
  };

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`/posts/${postId}`);
      setPosts(posts.filter(post => post.id !== postId));
    } catch (err) {
      setError('Failed to delete post. Please try again.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="user-posts">
      <h1>Your Posts</h1>
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <ul>
          {posts.map(post => (
            <li key={post.id} className="post-item">
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              {post.imageFile && (
                <img src={`data:${post.imageFileType};base64,${post.imageFile}`} alt="Post" />
              )}
              <button onClick={() => handleEdit(post.id)}>Edit</button>
              <button onClick={() => handleDelete(post.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserPosts;
