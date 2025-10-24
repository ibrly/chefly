import axios from '@/lib/axios';

export const paymentService = {
  async createPaymentIntent(bookingId: string): Promise<{ paymentUrl: string; orderId: string }> {
    const response = await axios.post('/payments/create-intent', { bookingId });
    return response.data;
  },

  async verifyPayment(orderId: string): Promise<{ success: boolean; booking: any }> {
    const response = await axios.post('/payments/verify', { orderId });
    return response.data;
  },

  async getPaymentHistory(): Promise<any[]> {
    const response = await axios.get('/payments/history');
    return response.data;
  },
};

