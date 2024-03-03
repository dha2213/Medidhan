import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css'
const Profile = () => {
  const [profileData, setProfileData] = useState(null);
const navigate=useNavigate();
  useEffect(() => {
    // Fetch user profile data using email from localStorage
    const fetchProfileData = async () => {
      try {
        const email = localStorage.getItem('email');
        const response = await fetch(`http://localhost:5000/api/profile?email=${email}`);
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

  const update=()=>{
    navigate('/updateprofile');
  }
  return (
    <div className="container">
      {profileData ? (
        <div className="profile">
          <h1 className="profile-title">Profile</h1>
          <div className="profile-info">
            <p><strong>Name:</strong> {profileData.fullName}</p>
            <p><strong>Address:</strong> {profileData.address}</p>
            <p><strong>Age:</strong> {profileData.age}</p>
            <p><strong>Date of Birth:</strong> {profileData.dateOfBirth}</p>
            {/* Add more profile data fields as needed */}
          </div>
        </div>
      ) : (
        <p>Loading profile data...</p>
      )}
      <button  style={{
                    backgroundColor: "#8B0000",
                    border: "none",
                    color: "#FFF",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    fontSize: "16px",
                    cursor: "pointer",
                    transition: "background-color 0.3s",
                  }} onClick={update}>Edit Profile</button>
    </div>
  );
};

export default Profile;
