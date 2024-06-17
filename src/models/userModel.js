import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, 'Please provide a first name']
  },
  last_name: {
    type: String,
    required: [true, 'Please provide a last name']
  },
  user_name: {
    type: String,
    required: [true, 'Please provide a user name'],
    unique: true
  },
  email: {
    type: String,
    required: [true, 'Please provide a email'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password require']
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  bookmarks: [{
    type: String
  }],
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  emailSendTime : Date,
  forgotPasswordSendTime : Date,
  verifyToken: String,
  verifyTokenExpiry: Date
})



// next js works on edge so first we check that is there any users collection created or not
const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
