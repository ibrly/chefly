import axios from '@/lib/axios';
import { USE_MOCK_DATA, mockAPI } from '@/lib/mockData';

export async function createPaymentIntent(
  bookingId: string
): Promise<{ paymentUrl: string; orderId: string }> {
  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      paymentUrl: `/payment/${bookingId}/mock`,
      orderId: `order-${Date.now()}`,
    };
  }

  const response = await axios.post('/payments/create-intent', { bookingId });
  return response.data;
}

export async function processPayment(data: {
  bookingId: string;
  amount: number;
  currency: string;
  paymentMethod: {
    type: string;
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    cardholderName: string;
  };
}): Promise<{ success: boolean; transactionId: string; message: string }> {
  if (USE_MOCK_DATA) {
    return await mockAPI.processPayment(data);
  }

  const response = await axios.post('/payments/process', data);
  return response.data;
}

export async function verifyPayment(
  orderId: string
): Promise<{ success: boolean; booking: any }> {
  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      success: true,
      booking: { id: orderId, status: 'CONFIRMED', paymentStatus: 'PAID' },
    };
  }

  const response = await axios.post('/payments/verify', { orderId });
  return response.data;
}

export async function getPaymentHistory(): Promise<any[]> {
  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return [];
  }

  const response = await axios.get('/payments/history');
  return response.data;
}

// Legacy export for backward compatibility
export const paymentService = {
  createPaymentIntent,
  processPayment,
  verifyPayment,
  getPaymentHistory,
};
