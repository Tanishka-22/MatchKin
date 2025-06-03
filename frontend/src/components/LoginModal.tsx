import React, { useState } from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
  onLogin: (token: string) => void;
};

const LoginModal: React.FC<Props> = ({ open, onClose, onLogin }) => {
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!open) return null;

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('https://matchkin-tbqg.onrender.com/auth/request-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, role: 'client' }),
      });
      if (!res.ok) throw new Error('Failed to request OTP');
      setStep('otp');
    } catch (err) {
      setError('Failed to request OTP');
    }
    setLoading(false);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('https://matchkin-tbqg.onrender.com/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (!res.ok || !data.token) throw new Error('Invalid OTP');
      onLogin(data.token);
      onClose();
    } catch (err) {
      setError('Invalid OTP');
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-surface-light p-8 rounded-2xl w-full max-w-sm relative">
        <button className="absolute top-2 right-3 text-white" onClick={onClose}>✕</button>
        <h2 className="text-xl font-bold mb-4">Login</h2>
        {step === 'email' && (
          <form onSubmit={handleRequestOtp}>
            <input
              className="input mb-3"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              disabled={loading}
            />
            <button className="btn-primary w-full" type="submit" disabled={loading}>
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
            {error && <p className="text-accent-500 mt-2">{error}</p>}
          </form>
        )}
        {step === 'otp' && (
          <form onSubmit={handleVerifyOtp}>
            <input
              className="input mb-3"
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={e => setOtp(e.target.value)}
              required
              disabled={loading}
            />
            <button className="btn-primary w-full" type="submit" disabled={loading}>
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
            {error && <p className="text-accent-500 mt-2">{error}</p>}
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginModal;