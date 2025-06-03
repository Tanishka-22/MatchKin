import mongoose from 'mongoose';

const clientProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  company: String,
  projects: [Object]
});

export default mongoose.model('ClientProfile', clientProfileSchema);
