'use client';

import React from 'react';
import CheckoutForm from '@/components/CheckoutForm';

const CheckoutPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <CheckoutForm />
    </div>
  );
};

export default CheckoutPage;