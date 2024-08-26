import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './Signup.css';

const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post('/api/auth/signup', data);
      localStorage.setItem('token', res.data.token);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
        <h2>Sign Up</h2>
        <input
          type="email"
          placeholder="Email"
          {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })}
          autoComplete="email"
        />
        {errors.email && <span className="error">{errors.email.message}</span>}
        
        <input
          type="password"
          placeholder="Password"
          {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
          autoComplete="new-password"
        />
        {errors.password && <span className="error">{errors.password.message}</span>}
        
        <button type="submit" className="btn-signup">SIGN UP</button>
      </form>
    </div>
  );
};

export default Signup;
