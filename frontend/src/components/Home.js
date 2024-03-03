import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  const [loggedIn, setLoggedIn] = useState(false); // State to track login status
  const [profilePicture, setProfilePicture] = useState(null); // State to store uploaded profile picture

  // Function to handle logout
  const handleLogout = () => {
    // Perform logout logic here
    setLoggedIn(false); // Update login status
  };

  // Function to handle profile picture upload
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      {/* Profile section */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '10px' }}>
         
          <div>
           
            <button onClick={handleLogout} style={{ border: '2px solid black', backgroundColor: 'lightgray', padding: '5px 10px', cursor: 'pointer' }}>Logout</button>
            <Link to="/profile" style={{ textDecoration: 'none' }}><button style={{ border: '2px solid black', backgroundColor: 'lightgray', padding: '5px 10px', cursor: 'pointer' }}>Profile</button></Link>
          </div>
        
          <Link to="/login"><button style={{ border: '2px solid black', backgroundColor: 'lightgray', padding: '5px 10px', cursor: 'pointer' }}>Login</button></Link>
        
      </div>

      {/* Main content */}
      <h2>Welcome to the Homepage</h2>
      {/* Add more content here */}
    </div>
  );
}

export default Home;
