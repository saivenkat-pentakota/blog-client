import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import CreatePost from './components/CreatePost';
import './App.css'; 

const App = () => {
    return (
        <Router>
            <div className="app-container">
                <header className="header">
                    <h1 className="header-title">ZUAI</h1>
                    <nav className="header-nav">
                        <button className="btn-login">Login</button>
                        <button className="btn-join">Join Now</button>
                    </nav>
                </header>
                <div className="content-wrapper">
                    <aside className="sidebar">
                        <nav>
                            <ul>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/create">Create Post</Link></li>
                                <li><Link to="/profile">Profile</Link></li>
                                <li><Link to="/settings">Settings</Link></li>
                            </ul>
                        </nav>
                    </aside>
                    <main className="main-content">
                        <Routes>
                            <Route path="/" element={<PostList />} />
                            <Route path="/posts/:id" element={<PostDetail />} />
                            <Route path="/create" element={<CreatePost />} />
                            <Route path="/profile" element={<div>Profile Page</div>} />
                            <Route path="/settings" element={<div>Settings Page</div>} />
                        </Routes>
                    </main>
                </div>
                <footer>
                    <p>&copy; 2024 My Blog</p>
                </footer>
            </div>
        </Router>
    );
};

export default App;
