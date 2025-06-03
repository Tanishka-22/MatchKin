import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

type Props = {
  onLoginClick: () => void;
  token: string | null;
  setToken: (t: string | null) => void;
};

const Navbar: React.FC<Props> = ({ onLoginClick, token, setToken }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      x: '100%',
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 ${
        isScrolled ? 'bg-surface/80 backdrop-blur-md' : 'bg-transparent'
      }`}
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <div className="container flex items-center justify-between">
        <motion.div
          className="flex items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="text-xl font-bold gradient-text mr-2">MatchKin</span>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.nav
          className="hidden md:flex items-center space-x-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a href="#home" className="text-gray-300 hover:text-white transition-colors">
            Home
          </a>
          <a href="#about" className="text-gray-300 hover:text-white transition-colors">
            About
          </a>
          <a href="#waitlist" className="text-gray-300 hover:text-white transition-colors">
            Join Waitlist
          </a>
          {token ? (
            <button className="btn-secondary" onClick={() => setToken(null)}>
              Logout
            </button>
          ) : (
            <button className="btn" id='BtnGet' onClick={onLoginClick}>
              Get Started
            </button>
          )}
        </motion.nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-white p-2"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className="fixed top-0 right-0 h-screen w-[80%] bg-surface-dark z-50 md:hidden"
        initial="closed"
        animate={isMobileMenuOpen ? 'open' : 'closed'}
        variants={mobileMenuVariants}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex justify-between items-center mb-8">
            <span className="text-xl font-bold gradient-text">MatchKin</span>
            <button onClick={toggleMobileMenu} className="text-white p-2" aria-label="Close menu">
              <X size={24} />
            </button>
          </div>
          <div className="flex flex-col space-y-6">
            <a
              href="#home"
              onClick={toggleMobileMenu}
              className="text-lg text-gray-300 hover:text-white transition-colors"
            >
              Home
            </a>
            <a
              href="#about"
              onClick={toggleMobileMenu}
              className="text-lg text-gray-300 hover:text-white transition-colors"
            >
              About
            </a>
            <a
              href="#waitlist"
              onClick={toggleMobileMenu}
              className="text-lg text-gray-300 hover:text-white transition-colors"
            >
              Join Waitlist
            </a>
            {token ? (
              <button className="btn-secondary mt-4" onClick={() => { setToken(null); toggleMobileMenu(); }}>
                Logout
              </button>
            ) : (
              <button className="btn-primary mt-4" onClick={() => { onLoginClick(); toggleMobileMenu(); }}>
                Get Started
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.header>
  );
};

export default Navbar; 