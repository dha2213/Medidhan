import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function PasswordCreation() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
        const email = localStorage.getItem('email');
  
        const response = await fetch('https://medidhan.onrender.com/api/auth/create-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
  
          body: JSON.stringify({email:email, password: password })
        });
        if (response.ok) {
          // OTP verified successfully, redirect to password creation page
          navigate('/updateprofile');
        }  
      } catch (error) {
         
        setError('Failed to create password');
      }

  };

  return (
    <div>
      <h2>Password Creation</h2>
      <form onSubmit={handleSubmit}>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default PasswordCreation;
