import { apiClient } from './api';

export const paymentService = {
  // Create payment intent
  async createPaymentIntent(bookingId: number): Promise<{
    payment: any;
    iframeUrl: string;
    paymentKey: string;
  }> {
    const response = await apiClient.post('/payments/intent', { bookingId });
    return response.data.data;
  },

  // Get payment status
  async getPaymentStatus(paymentId: number): Promise<any> {
    const response = await apiClient.get(`/payments/${paymentId}`);
    return response.data.data;
  },
};

