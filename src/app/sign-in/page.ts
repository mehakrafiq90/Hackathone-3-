'use client';
import { SignIn } from '@clerk/clerk-react';
import { useState, useEffect } from 'react';

const SignInPage = () => {
  const [signInComplete, setSignInComplete] = useState(false);

  useEffect(() => {
    if (signInComplete) {
      const timer = setTimeout(() => {
        window.location.href = '/';  // Redirect to home page after 2 seconds
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [signInComplete]);

  // Remove or use handleSignInComplete as required.
  // const handleSignInComplete = () => {
  //   setSignInComplete(true);
  // };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
      {!signInComplete ? (
        <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" redirectUrl="/" />
      ) : (
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Sign-In Successful</h1>
          <p>Redirecting to home page...</p>
        </div>
      )}
    </div>
  );
};

export default SignInPage;