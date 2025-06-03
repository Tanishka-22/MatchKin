import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Heart, Users, Lock, Zap } from 'lucide-react';

const features = [
  {
    icon: <Heart className="h-6 w-6 text-accent-400" />,
    title: 'Advanced Matching Algorithm',
    description: 'Our proprietary algorithm analyzes multiple compatibility factors to find your perfect match.',
  },
  {
    icon: <Lock className="h-6 w-6 text-primary-400" />,
    title: 'Privacy Focused',
    description: 'Your data is always encrypted and protected. We never share your information without permission.',
  },
  {
    icon: <Users className="h-6 w-6 text-secondary-400" />,
    title: 'Growing Community',
    description: 'Join thousands of members who are already finding meaningful connections every day.',
  },
  {
    icon: <Zap className="h-6 w-6 text-green-400" />,
    title: 'Instant Connections',
    description: 'Start conversations immediately when you match with compatible profiles.',
  },
];

const AboutSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="about" className="section relative overflow-hidden">
      <div className="absolute -top-[30%] -right-[20%] w-[70%] h-[70%] rounded-full bg-primary-600/5 blur-3xl"></div>
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Why Choose <span className="gradient-text">MatchKin</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-300"
          >
            MatchKin uses cutting-edge technology to help you find meaningful connections
            based on compatibility, shared interests, and relationship goals.
          </motion.p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="glass-card p-8 h-full"
            >
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-surface-light mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 glass-card p-8 md:p-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-6">Our Matching Process</h3>
              <p className="text-gray-300 mb-6">
                We go beyond surface-level preferences to find connections that truly matter. 
                Our multi-factor compatibility system analyzes your personality, values, and goals 
                to suggest matches with real potential.
              </p>
              <div className="space-y-4">
                {[
                  'Personality compatibility analysis',
                  'Shared interests and values',
                  'Relationship goals alignment',
                  'Communication style matching'
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className="h-5 w-5 rounded-full bg-primary-500 flex items-center justify-center mr-3">
                      <span className="text-xs font-bold">{index + 1}</span>
                    </div>
                    <p className="text-sm text-gray-300">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-full h-80 md:h-96">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/20 to-accent-500/20 rounded-3xl overflow-hidden">
                  <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3228766/pexels-photo-3228766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center mix-blend-overlay opacity-50"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="p-6 bg-surface/80 backdrop-blur-md rounded-2xl text-center">
                    <p className="text-2xl font-bold gradient-text mb-2">98%</p>
                    <p className="text-sm">Success Rate</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;