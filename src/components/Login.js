import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import './Login.css';
import Spinner from './Spinner'; 

const Login = ({ setIsAuthenticated }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        if (!validateEmail(email)) {
            setError('Invalid email format');
            setLoading(false);
            return;
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters long');
            setLoading(false);
            return;
        }

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, { email, password });
            if (res.status === 200) {
                setSuccess('Login successful!');
                Cookies.set('userEmail', email, { expires: 7 });
                setIsAuthenticated(true);
                setTimeout(() => {
                    setLoading(false);
                    navigate('/posts');
                }, 2000);
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed');
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            {error && <div className="popup error">{error}</div>}
            {success && <div className="popup success">{success}</div>}
            <form onSubmit={handleLogin} className="login-form">
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete='email'
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete='password'
                    />
                </div>
                <button type="submit" className="login-button" disabled={loading}>Login</button>
                <p>
                    Don't have an account? <Link to="/signup">Sign up</Link>
                </p>
            </form>
            {loading && <Spinner />}
        </div>
    );
};

export default Login;
