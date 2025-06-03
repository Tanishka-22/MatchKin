import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Twitter, Facebook, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
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
    <footer className="bg-surface-dark py-12 md:py-16">
      <motion.div
        className="container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        <motion.div 
          variants={itemVariants}
          className="flex flex-col md:flex-row justify-between items-center mb-10"
        >
          <div className="mb-6 md:mb-0">
            <span className="text-2xl font-bold gradient-text">MatchKin</span>
          </div>
          
          <div className="flex space-x-6">
            {[
              { icon: <Instagram size={20} />, label: 'Instagram' },
              { icon: <Twitter size={20} />, label: 'Twitter' },
              { icon: <Facebook size={20} />, label: 'Facebook' },
              { icon: <Linkedin size={20} />, label: 'LinkedIn' },
            ].map((social, index) => (
              <a
                key={index}
                href="#"
                className="h-10 w-10 rounded-full bg-surface-light flex items-center justify-center text-gray-400 hover:text-white hover:bg-surface transition-colors"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-4 gap-8 py-10 border-t border-b border-gray-800"
        >
          <div>
            <h3 className="font-medium mb-4">Company</h3>
            <ul className="space-y-2">
              {['About Us', 'Careers', 'Press', 'News'].map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Resources</h3>
            <ul className="space-y-2">
              {['Blog', 'Newsletter', 'Events', 'Help Center'].map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Legal</h3>
            <ul className="space-y-2">
              {['Terms', 'Privacy', 'Cookies', 'Licenses'].map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Connect</h3>
            <ul className="space-y-2">
              {['Contact', 'Support', 'Partner', 'Advertise'].map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className="pt-10 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {currentYear} MatchKin. All rights reserved.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            {['Terms', 'Privacy', 'Cookies'].map((item, index) => (
              <a
                key={index}
                href="#"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;