import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import WaitlistSection from './components/WaitlistSection';
import Footer from './components/Footer';
import MouseFollower from './components/MouseFollower';
import LoginModal from './components/LoginModal';

function App() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  // Optionally, persist token in localStorage
  React.useEffect(() => {
    const t = localStorage.getItem('token');
    if (t) setToken(t);
  }, []);
  React.useEffect(() => {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
  }, [token]);

  return (
    <div className="min-h-screen bg-surface">
      <MouseFollower />
      <Navbar onLoginClick={() => setLoginOpen(true)} token={token} setToken={setToken} />
      <main>
        <HeroSection onGetStarted={() => setLoginOpen(true)} />
        <AboutSection />
        <WaitlistSection />
      </main>
      <Footer />
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} onLogin={setToken} />
    </div>
  );
}

export default App;