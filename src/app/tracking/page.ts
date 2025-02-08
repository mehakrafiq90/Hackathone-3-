import React from 'react';
import Tracking from '@/components/Tracking';

const TrackingPage: React.FC = () => {
  // Simulate a user authentication check
  const user = true; // Replace this with actual authentication logic

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6 text-center">Track Your Shipment</h1>
      {user ? (
        <Tracking />
      ) : (
        <p className="text-center text-red-500">Please sign in to track your order.</p>
      )}
    </div>
  );
};

export default TrackingPage;