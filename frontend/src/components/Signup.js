import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Signup.css"
function Signup() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

  try{
    const response = await fetch('https://medidhan.onrender.com/api/auth/send-otp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email }) // Convert email to an object before stringifying
    });
    const data = await response.json();
    console.log(data);
    localStorage.setItem("email", email);
    navigate('/OTPVerification');
    
  }
  catch(error){ 
    console.error('Error sending OTP:', error);
    setError('Failed to send OTP. Please try again.');
   
  };
}

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
  <h2 style={{ marginBottom: '20px' }}>Please enter your email for OTP verification</h2>
  {error && <p style={{ color: 'red' }}>{error}</p>}
  <form onSubmit={handleSubmit} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <input
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
      style={{ padding: '10px', marginRight: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '250px' }}
    />
    <button type="submit" style={{ padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
      Submit
    </button>
  </form>
</div>

    // <div>
    //   <h2>Please enter your email for otp varification</h2>
    //   {error && <p style={{ color: 'red' }}>{error}</p>}
    //   <form onSubmit={handleSubmit}>
    //     <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
    //     <button type="submit">Submit</button>
    //   </form>
    // </div>
  );
}

export default Signup;
