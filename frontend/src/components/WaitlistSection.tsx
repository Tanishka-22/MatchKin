import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, CheckCircle2, XCircle } from 'lucide-react';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

const WaitlistSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset errors
    setEmailError('');
    
    // Validate email
    if (!email) {
      setEmailError('Email is required');
      return;
    }
    
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    
    // Submit form
    setFormStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setFormStatus('success');
      setEmail('');
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormStatus('idle');
      }, 3000);
    }, 1500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <section id="waitlist" className="section relative overflow-hidden">
      <div className="absolute -bottom-[30%] -left-[20%] w-[70%] h-[70%] rounded-full bg-accent-600/5 blur-3xl"></div>
      
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="container"
      >
        <div className="glass-card p-8 md:p-12 max-w-4xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join Our <span className="gradient-text">Waitlist</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Be among the first to experience MatchKin when we launch. 
              Enter your email below to secure your spot on our waitlist.
            </p>
          </motion.div>

          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="max-w-md mx-auto"
          >
            <div className="relative mb-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className={`input pr-12 ${emailError ? 'border-accent-500 focus:ring-accent-500' : ''}`}
                disabled={formStatus === 'loading' || formStatus === 'success'}
              />
              {formStatus === 'idle' && (
                <button 
                  type="submit" 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-10 w-10 rounded-full bg-primary-600 flex items-center justify-center hover:bg-primary-700 transition-colors"
                  aria-label="Join waitlist"
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
              )}
              {formStatus === 'loading' && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <div className="h-5 w-5 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              {formStatus === 'success' && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                </div>
              )}
              {formStatus === 'error' && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <XCircle className="h-5 w-5 text-accent-500" />
                </div>
              )}
            </div>
            
            {emailError && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-sm text-accent-500 mb-4"
              >
                {emailError}
              </motion.p>
            )}
            
            {formStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-center space-x-2 text-green-500 mb-4"
              >
                <CheckCircle2 className="h-5 w-5" />
                <p>You've been added to our waitlist!</p>
              </motion.div>
            )}

            <p className="text-xs text-gray-400 text-center mt-3">
              By joining, you agree to our Terms of Service and Privacy Policy.
            </p>
          </motion.form>
          
          <motion.div 
            variants={itemVariants}
            className="mt-12 pt-10 border-t border-gray-800"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              {[
                { number: '5,000+', label: 'Users on Waitlist' },
                { number: '7 Days', label: 'Until Beta Launch' },
                { number: 'Free', label: 'Early Access' },
              ].map((stat, index) => (
                <div key={index}>
                  <p className="text-2xl md:text-3xl font-bold gradient-text">{stat.number}</p>
                  <p className="text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        
        <motion.div
          variants={itemVariants}
          className="mt-16 text-center"
        >
          <p className="text-lg font-medium mb-4">Trusted by Industry Leaders</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 opacity-60">
            {['TechCrunch', 'Forbes', 'Wired', 'The Verge', 'Product Hunt'].map((brand, index) => (
              <div key={index} className="flex items-center">
                <span className="text-xl font-bold">{brand}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default WaitlistSection;