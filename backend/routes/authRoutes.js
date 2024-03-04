const express = require('express');
const router = express.Router();
const { User } = require('../models/User');
const { sendOTP } = require('../utils/otp');
const bcrypt = require('bcrypt');
// Login route

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (user) {
      // Compare hashed passwords
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (isPasswordMatch) {
        res.status(200).json({ message: 'Login successful' });
      } else {
        res.status(401).json({ error: 'Incorrect password' });
      }
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Send OTP route
router.post('/send-otp', async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);
    const otp = Math.floor(100000 + Math.random() * 900000);

    await sendOTP(email, otp);

    const doc = new User({
      email: email,
      otp: otp
    });
    await doc.save();

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ message: error.message });
  }
});


router.post('/verify-otp', async (req, res) => {
  try {

   
    console.log("newotp",req.body.otp);

    const newotp = req.body.otp;
    const email = req.body.email;
    
   const user = await User.findOne({email: email});
   console.log("oldotp"+ user.otp);
    // Check if the user exists and if the OTP matches
    if (newotp != user.otp) {
      await User.findOneAndUpdate({email: email}, {email: null, otp: null});
      res.status(400).json({ error: 'Invalid OTP' });

    }

    else {
      res.status(200).json({ message: 'OTP verified successfully' });


    }

  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create password route
router.post('/create-password', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Encrypt password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the saltRounds

    const user = await User.findOneAndUpdate({ email: email }, { password: hashedPassword });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'Password created successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
