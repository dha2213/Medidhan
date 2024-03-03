import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      const response = await fetch('https://medidhan.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      
      if (response.ok) {
        // Login successful, navigate to dashboard
        navigate('/profile');
      } else {
        // Handle error
        setError(data.error);
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('An error occurred. Please try again later.');
    }
};

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  return (
    <div className="login-container">
    <div className="login-form">
      <h2 className="login-heading">Sign in to your account</h2>
      <form className="login-form-fields" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Enter your email"
            required
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <div className="flex justify-between">
            <label htmlFor="password" className="form-label">
              Password
            </label>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            required
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="login-btn">
          Sign in
        </button>
      </form>
      <p className="login-register-link">
        <p>Don't have an account? <button onClick={() => navigate('/signup')}>Sign Up</button></p>
      </p>
    </div>
  </div>
  );
}

export default Login;
