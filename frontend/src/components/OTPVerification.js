import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function OTPVerification() {
  const [otp, setOTP] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const email = localStorage.getItem('email');

      const response = await fetch('https://medidhan.onrender.com/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({email:email, otp: otp })
      });
      if (response.ok) {
        // OTP verified successfully, redirect to password creation page
        navigate('/password-creation');
      } else {
        alert('Please enter correct OTP');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setError('Failed to verify OTP');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
  <h2 style={{ marginBottom: '20px' }}>OTP Verification</h2>
  {error && <p style={{ color: 'red' }}>{error}</p>}
  <form onSubmit={handleSubmit} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <input
      type="text"
      placeholder="OTP"
      value={otp}
      onChange={(e) => setOTP(e.target.value)}
      required
      style={{ padding: '10px', marginRight: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '250px' }}
    />
    <button type="submit" style={{ padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
      Submit
    </button>
  </form>
</div>

    // <div>
    //   <h2>OTP Verification</h2>
    //   {error && <p style={{ color: 'red' }}>{error}</p>}
    //   <form onSubmit={handleSubmit}>
    //     <input type="text" placeholder="OTP" value={otp} onChange={(e) => setOTP(e.target.value)} required />
    //     <button type="submit">Submit</button>
    //   </form>
    // </div>
  );
}

export default OTPVerification;
