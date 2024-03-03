import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes component
import Login from './components/Login';
import OTPVerification from './components/OTPVerification';
import PasswordCreation from './components/PasswordCreation';
import Profile from './components/Profile';
import Signup from './components/Signup';
import Home from './components/Home';
import UpdateProfile from './components/UpdateProfile';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes> {/* Use Routes component */}
          <Route path="/" element={<Home />} /> {/* Use element prop to specify component */}
          <Route path="/login" element={<Login />} />  
          <Route path="/OTPVerification" element={<OTPVerification />} />
          <Route path="/password-creation" element={<PasswordCreation />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/updateprofile" element={<UpdateProfile />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
