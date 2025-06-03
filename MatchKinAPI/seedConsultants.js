import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import ConsultantProfile from './models/ConsultantProfile.js';

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await User.deleteMany({});
    await ConsultantProfile.deleteMany({});

    const consultants = [
      {
        email: 'john@example.com',
        role: 'consultant',
        profile: {
          skills: ['React', 'Node.js', 'MongoDB'],
          domain: 'Web Development',
          availability: 'Immediate'
        }
      },
      {
        email: 'jane@example.com',
        role: 'consultant',
        profile: {
          skills: ['Python', 'Data Analysis', 'Pandas'],
          domain: 'Data Science',
          availability: '2 weeks'
        }
      },
      {
        email: 'mark@example.com',
        role: 'consultant',
        profile: {
          skills: ['React', 'MongoDB', 'Tailwind CSS'],
          domain: 'Web Development',
          availability: '1 month'
        }
      }
    ];

    for (const c of consultants) {
      const user = await User.create({ email: c.email, role: c.role });
      await ConsultantProfile.create({
        user: user._id,
        ...c.profile
      });
    }

    console.log('✅ Seeded 3 consultant profiles.');
  } catch (err) {
    console.error('❌ Error seeding consultants:', err);
  } finally {
    await mongoose.disconnect();
  }
};

seed();
