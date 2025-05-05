const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String },
  otp: { type: String },
  otpExpires: { type: Date },
  isVerified: { type: Boolean, default: false },
  role:{type:String, enum: ['student', 'teacher','admin'], default: 'student'},
});

module.exports = mongoose.model("User", userSchema);
