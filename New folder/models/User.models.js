const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,  
    trim: true
  },
  email: {
    type: String,
    required: true, 
    unique: true,    
    trim: true,
    lowercase: true, 
    match: [/^\S+@\S+\.\S+$/, 'Invalid email address']  
  },
  password: {
    type: String,
    required: true,  
    minlength: 6     
  }
});
const User = mongoose.model('User', userSchema);
module.exports = User;
