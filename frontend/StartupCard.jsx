import React, { useState } from 'react';
import StartupModal from './StartupModal';

export default function StartupCard({ startup }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div
        className="bg-white shadow-md rounded p-4 cursor-pointer hover:shadow-lg transition"
        onClick={() => setModalOpen(true)}
      >
        <h2 className="font-bold text-lg">{startup.name}</h2>
        <p className="text-sm text-gray-500">{startup.industry}</p>
      </div>

      {modalOpen && (
        <StartupModal startup={startup} onClose={() => setModalOpen(false)} />
      )}
    </>
  );
}