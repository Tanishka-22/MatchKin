import ConsultantProfile from '../models/ConsultantProfile.js';
import React, { useState } from 'react';

export const matchConsultants = async (req, res) => {
  const { skills, domain, timeline } = req.body;
  const consultants = await ConsultantProfile.find().populate('user');

  const matches = consultants.map(c => {
    const skillMatch = c.skills.filter(skill => skills.includes(skill)).length;
    const domainMatch = c.domain === domain ? 1 : 0;
    const score = (skillMatch * 10) + (domainMatch * 30);
    return {
      consultant: {
        email: c.user.email,
        skills: c.skills,
        domain: c.domain,
        availability: c.availability,
      },
      score,
      explanation: `${skillMatch} skill(s) matched, domain ${domainMatch ? 'matched' : 'not matched'}`,
    };
  });

  matches.sort((a, b) => b.score - a.score);
  res.json({ matches: matches.slice(0, 3) });
};

const MatchConsultants: React.FC<{ token: string | null }> = ({ token }) => {
  const [project, setProject] = useState({
    skills: ['React', 'MongoDB'],
    domain: 'Web Development',
    timeline: '1 month'
  });
  const [matches, setMatches] = useState<any[]>([]);
  const [error, setError] = useState('');

  const handleMatch = async () => {
    setError('');
    setMatches([]);
    try {
      const res = await fetch('http://localhost:3000/match', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(project)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to match');
      setMatches(data.matches);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div>
      <button className="btn-primary" onClick={handleMatch} disabled={!token}>
        Find Top 3 Consultants
      </button>
      {error && <div className="text-accent-500">{error}</div>}
      <div>
        {matches.map((m, i) => (
          <div key={i} className="glass-card p-4 my-2">
            <div><b>Email:</b> {m.consultant.email}</div>
            <div><b>Skills:</b> {m.consultant.skills.join(', ')}</div>
            <div><b>Domain:</b> {m.consultant.domain}</div>
            <div><b>Availability:</b> {m.consultant.availability}</div>
            <div><b>Score:</b> {m.score}</div>
            <div><b>Reason:</b> {m.explanation}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchConsultants;
