import User from '../models/User.js';
import { generateOTP } from '../utils/otpGenerator.js';
import jwt from 'jsonwebtoken';

export const requestOTP = async (req, res) => {
  const { email, role } = req.body;
  let user = await User.findOne({ email });

  if (!user) user = await User.create({ email, role });

  const otp = generateOTP();
  user.otp = otp;
  user.otpExpires = new Date(Date.now() + 5 * 60000);
  await user.save();

  console.log(`OTP for ${email}: ${otp}`);
  res.json({ message: 'OTP sent to email (simulated)', otp }); 
};

export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email });

  if (!user || user.otp !== otp || Date.now() > user.otpExpires) {
    return res.status(400).json({ error: 'Invalid or expired OTP' });
  }

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};
