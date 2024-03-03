const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String },
  otp: String,
  profile: {
    fullName: String,
    address: String,
    age: Number,
    dateOfBirth: Date,
    profilePhoto:{ 
      data        : Buffer, 
      contentType : String 
  } // Change the type to String
  }
});

const User = mongoose.model('User', userSchema); // Use mongoose.model directly
module.exports = { User }; // Corrected typo in module.exports
