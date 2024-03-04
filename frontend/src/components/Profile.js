import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import photo from './photo.jpg'; // Assuming './photo' is the correct path to your photo file

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user profile data using email from localStorage
    const fetchProfileData = async () => {
      try {
        const email = localStorage.getItem('email');
        const response = await fetch(`https://medidhan.onrender.com/api/profile?email=${email}`);
        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }
        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfileData();
  }, []); // Empty dependency array to run effect only once on component mount

  const update = () => {
    navigate('/updateprofile');
  };

  return (
    <div style={{
       justifyContent: 'center',
       alignItems: 'center',
      backgroundColor: '',
      backgroundColor: '#ccccb3',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      padding: '20px',
      maxWidth: '600px',
      margin: '0 auto',
    }}>
      {profileData ? (
        <div style={{ margin: '0 auto', maxWidth: '1000px', position: 'relative' }}>
          <h1 style={{ marginBottom: '20px' }}>Profile details</h1>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Profile Data */}
            <div style={{ textAlign: 'left', marginRight: '20px' }}>
              <p><strong>Name:</strong> {profileData.fullName}</p>
              <p><strong>Address:</strong> {profileData.address}</p>
              <p><strong>Age:</strong> {profileData.age}</p>
              <p><strong>Date of Birth:</strong> {profileData.dateOfBirth}</p>
              {/* Add more profile data fields as needed */}
            </div>
            {/* Profile Photo */}
            <img
              src={photo} // Assuming there's a 'photo' field in the profile data
              alt="Profile"
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                objectFit: 'cover',
                position: 'absolute',
                top: '0',
                right: '0',
              }}
            />
          </div>
        </div>
      ) : (
        <p>Loading profile data...</p>
      )}
      <button
        style={{
          backgroundColor: "#8B0000",
          border: "none",
          color: "#FFF",
          padding: "10px 20px",
          borderRadius: "5px",
          fontSize: "16px",
          cursor: "pointer",
          transition: "background-color 0.3s",
          marginTop: '20px'
        }}
        onClick={update}
      >
        Edit Profile
      </button>
    </div>
  );
};

export default Profile;
