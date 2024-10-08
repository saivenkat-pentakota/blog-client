import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import './Login.css';
import Spinner from './Spinner'; 

const Login = ({ setIsAuthenticated, setUserId }) => {
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
        setLoading(true); // Set loading to true as soon as the form is submitted

        if (!validateEmail(email)) {
            setError('Invalid email format');
            setLoading(false); // Hide spinner if there is an error
            return;
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters long');
            setLoading(false); // Hide spinner if there is an error
            return;
        }

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, { email, password });
            if (res.status === 200) {
                const { token, userId } = res.data; 
                Cookies.set('token', token, { expires: 7 }); // Store the token in cookies
                Cookies.set('userEmail', email, { expires: 7 });
                setIsAuthenticated(true);
                setUserId(userId); // Set userId from response
                setSuccess('Login successful!');
                setTimeout(() => {
                    setLoading(false);
                    navigate('/posts');
                }, 2000); // Delay to show spinner
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed');
            setLoading(false); // Hide spinner if there is an error
        }
    };

    console.log('Loading:', loading); // Debug loading state

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
            {loading && <Spinner />} {/* Show spinner when loading */}
        </div>
    );
};

export default Login;
