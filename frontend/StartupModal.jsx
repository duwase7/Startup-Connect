import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function StartupModal({ startup, onClose }) {
  const position = [startup.latitude, startup.longitude];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded p-6 w-11/12 max-w-lg relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-900"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-xl font-bold">{startup.name}</h2>
        <p className="text-gray-600">{startup.industry}</p>
        <p className="text-gray-500 mt-2">{startup.description}</p>
        <p className="mt-2">
          Funding: <strong>{startup.funding || 'N/A'}</strong>
        </p>
        <a
          href={startup.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline mt-2 block"
        >
          Visit Website
        </a>

        {startup.latitude && startup.longitude && (
          <div className="mt-4 h-48 w-full">
            <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position}>
                <Popup>{startup.name}</Popup>
              </Marker>
            </MapContainer>
          </div>
        )}
      </div>
    </div>
  );
}