import mongoose from 'mongoose';

const consultantProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  skills: [String],
  domain: String,
  availability: String
});

export default mongoose.model('ConsultantProfile', consultantProfileSchema);
