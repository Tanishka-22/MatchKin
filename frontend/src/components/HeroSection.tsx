import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MousePointer, Users, Heart, TrendingUp } from 'lucide-react';

type HeroSectionProps = {
  onGetStarted: () => void;
};

const HeroSection: React.FC<HeroSectionProps> = ({ onGetStarted }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section 
      id="home" 
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="https://web-images.credcdn.in/v2/_next/assets/images/landing/desktop/hero-desktop-poster.jpg?tr=q-95"
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
        src="https://web-images.credcdn.in/v2/_next/assets/videos/landing/desktop/hero-desktop.mp4?tr=q-95"
      />

      {/* Gradient overlays */}
      {/* <div className="absolute inset-0 z-10">
        <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-b from-primary-900/20 to-surface"></div>
        <div className="absolute -top-[30%] -left-[20%] w-[70%] h-[70%] rounded-full bg-primary-600/10 blur-3xl"></div>
        <div className="absolute top-[20%] -right-[20%] w-[60%] h-[60%] rounded-full bg-accent-600/10 blur-3xl"></div>
      </div> */}

      {/* Content */}
      <motion.div 
        className="container relative z-20 mx-auto px-4 flex flex-col items-center text-center"
        style={{ y, opacity }}
      >
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center px-4 py-2 rounded-full bg-surface-light border border-gray-700 mb-6"
        >
          <span className="h-2 w-2 rounded-full bg-primary-500 mr-2"></span> 
          <span className="text-sm font-medium">Coming Soon</span>
        </motion.div> */}

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 max-w-4xl"
        >
          Find your perfect match with{' '}
          <span className="gradient-text">MatchKin</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl"
        >
          Discover meaningful connections with our revolutionary matching algorithm. 
          Join thousands who've found their perfect match.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a 
            href="#waitlist" 
            className="btn"
            id="JoinBtn"
          >
            Join the Waitlist
          </a>
         
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10"
        >
          {[
            { icon: <Users className="h-6 w-6 text-primary-400" />, text: "10k+ Matches" },
            { icon: <Heart className="h-6 w-6 text-accent-400" />, text: "98% Success Rate" },
            { icon: <TrendingUp className="h-6 w-6 text-secondary-400" />, text: "5-Star Rating" },
            { icon: <MousePointer className="h-6 w-6 text-green-400" />, text: "Free to Join" },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
            >
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-surface-light mb-3">
                {item.icon}
              </div>
              <p className="text-sm font-medium">{item.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface to-transparent pointer-events-none z-30"></div>
    </section>
  );
};

export default HeroSection;