import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import CreatePost from './components/CreatePost';

const App = () => {
    return (
        <Router>
            <div>
                <header>
                    <h1>My Blog</h1>
                </header>
                <main>
                    <Routes>
                        <Route path="/" element={<PostList />} />
                        <Route path="/posts/:id" element={<PostDetail />} />
                        <Route path="/create" element={<CreatePost />} />
                    </Routes>
                </main>
                <footer>
                    <p>&copy; 2024 My Blog</p>
                </footer>
            </div>
        </Router>
    );
};

export default App;
