
'use client';
import { SignUp } from '@clerk/clerk-react';

const SignUpPage = () => (
  <div className="flex justify-center items-center h-screen bg-gray-50">
    <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
  </div>
);

export default SignUpPage;
