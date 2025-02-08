'use client';

import React from 'react';

const FactorOne: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Factor One</h1>
        <p className="mb-4">Please complete the additional sign-in step.</p>
        {/* Any additional steps needed for factor one can be added here */}
      </div>
    </div>
  );
};

export default FactorOne;
    