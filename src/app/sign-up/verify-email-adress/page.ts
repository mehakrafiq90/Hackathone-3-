'use client';

import React, { useState } from 'react';
import { useSignUp } from '@clerk/clerk-react';

const VerifyEmailAddressPage: React.FC = () => {
  const { isLoaded, signUp } = useSignUp();
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState<string>('');

  const handleVerification = async () => {
    if (!isLoaded || !verificationCode || !signUp) return;

    try {
      await signUp.attemptEmailAddressVerification({ code: verificationCode });
      alert('Email verified successfully!');
      window.location.href = '/'; // Redirect to home page after successful verification
    } catch (err: unknown) {
      setError('Verification failed. Please check the code and try again.');
    }
  };

  const requestNewCode = async () => {
    if (!signUp) return;

    try {
      await signUp.prepareEmailAddressVerification();
      alert('A new verification code has been sent to your email.');
    } catch (err: unknown) {
      setError('Failed to send new verification code. Please try again later.');
    }
  };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-lg rounded-lg">
//         <h1 className="text-3xl font-extrabold text-blue-600">Verify Your Email</h1>
//         <p className="text-gray-700">Please enter the verification code sent to your email address.</p>
//         <input
//           type="text"
//           value={verificationCode}
//           onChange={(e) => setVerificationCode(e.target.value)}
//           placeholder="Enter verification code"
//           className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
//         />
//         {error && <p className="text-red-600">{error}</p>}
//         <button
//           onClick={handleVerification}
//           className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//         >
//           Verify Email
//         </button>
//         <button
//           onClick={requestNewCode}
//           className="w-full px-4 py-2 mt-4 text-white bg-gray-600 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
//         >
//           Request New Code
//         </button>
//       </div>
//     </div>
//   );
// };

// export default VerifyEmailAddressPage;