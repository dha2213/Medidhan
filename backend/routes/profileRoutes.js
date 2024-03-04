const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require('path');
const { User } = require('../models/User');
const { log } = require('console');
const bcrypt = require('bcrypt');
// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads"); // Adjust the path accordingly
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});


const upload = multer({ 
  storage: storage,
});


router.get('/', async (req, res) => {
  try {
    const { email } = req.query;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Return the user's profile data
    res.json(user.profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post("/update-profile", upload.single('profilePhoto'), async (req, res) => {
  try {
    const { email, fullName, address, age, dateOfBirth, password } = req.body;
    const profilePhotoPath = req.file ? req.file.path : null; // Retrieve the path of the uploaded image

    // Find the user by email
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Update user details
    user.profile.fullName = fullName;
    user.profile.address = address;
    user.profile.age = age;
    user.profile.dateOfBirth = dateOfBirth;
    user.profile.profilePhoto = profilePhotoPath; // Store the image path

    // Encrypt the password before saving
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the saltRounds
    user.password = hashedPassword;

    // Save the updated user
    await user.save();

    res.json({ msg: "User details updated successfully", user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
