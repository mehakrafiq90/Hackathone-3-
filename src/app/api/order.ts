import { v4 as uuidv4 } from 'uuid';

interface OrderDetails {
  productName: string;
  quantity: number;
  customerName: string;
  customerEmail: string;
}

// Mock database save function
const saveOrderToDatabase = async (order: OrderDetails) => {
  console.log('Order saved to database:', order);
};

export const placeOrder = async (orderDetails: OrderDetails) => {
  const trackingNumber = uuidv4(); // Generate a unique tracking number
  const orderWithTracking = {
    ...orderDetails,
    trackingNumber,
    status: 'Processing',
  };

  // Save the orderWithTracking to your database
  await saveOrderToDatabase(orderWithTracking);

  return orderWithTracking;
};