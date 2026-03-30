import React, { useEffect, useState } from 'react';
import StartupCard from './components/StartupCard';
import { fetchStartups } from './api';

export default function App() {
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStartups().then(data => {
      setStartups(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Loading startups...</p>;

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {startups.map(startup => (
        <StartupCard key={startup.id} startup={startup} />
      ))}
    </div>
  );
}