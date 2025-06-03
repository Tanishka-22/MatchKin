import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['client', 'consultant'], required: true },
  otp: String,
  otpExpires: Date
});

export default mongoose.model('User', userSchema);
