import axios from 'axios';

const PAYMOB_BASE_URL = 'https://accept.paymob.com/api';

interface PaymobConfig {
  apiKey: string;
  integrationId: string;
  iframeId: string;
  hmacSecret: string;
}

class PaymobService {
  private config: PaymobConfig;
  private authToken: string | null = null;
  private tokenExpiry: number = 0;

  constructor() {
    this.config = {
      apiKey: process.env.PAYMOB_API_KEY || '',
      integrationId: process.env.PAYMOB_INTEGRATION_ID || '',
      iframeId: process.env.PAYMOB_IFRAME_ID || '',
      hmacSecret: process.env.PAYMOB_HMAC_SECRET || '',
    };
  }

  async authenticate(): Promise<string> {
    if (this.authToken && Date.now() < this.tokenExpiry) {
      return this.authToken;
    }

    try {
      const response = await axios.post(`${PAYMOB_BASE_URL}/auth/tokens`, {
        api_key: this.config.apiKey,
      });

      this.authToken = response.data.token;
      this.tokenExpiry = Date.now() + 50 * 60 * 1000;

      return this.authToken;
    } catch (error: any) {
      console.error('Paymob authentication error:', error.response?.data || error.message);
      throw new Error('Failed to authenticate with Paymob');
    }
  }

  async registerOrder(
    authToken: string,
    amountCents: number,
    merchantOrderId: string,
    currency: string = 'EGP'
  ): Promise<number> {
    try {
      const response = await axios.post(`${PAYMOB_BASE_URL}/ecommerce/orders`, {
        auth_token: authToken,
        delivery_needed: false,
        amount_cents: amountCents,
        currency,
        merchant_order_id: merchantOrderId,
        items: [],
      });

      return response.data.id;
    } catch (error: any) {
      console.error('Paymob order registration error:', error.response?.data || error.message);
      throw new Error('Failed to register order with Paymob');
    }
  }

  async getPaymentKey(
    authToken: string,
    orderId: number,
    amountCents: number,
    billingData: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
    }
  ): Promise<string> {
    try {
      const response = await axios.post(`${PAYMOB_BASE_URL}/acceptance/payment_keys`, {
        auth_token: authToken,
        amount_cents: amountCents,
        expiration: 3600,
        order_id: orderId,
        billing_data: {
          apartment: 'NA',
          email: billingData.email,
          floor: 'NA',
          first_name: billingData.firstName,
          street: 'NA',
          building: 'NA',
          phone_number: billingData.phone,
          shipping_method: 'NA',
          postal_code: 'NA',
          city: 'NA',
          country: 'NA',
          last_name: billingData.lastName,
          state: 'NA',
        },
        currency: 'EGP',
        integration_id: parseInt(this.config.integrationId),
      });

      return response.data.token;
    } catch (error: any) {
      console.error('Paymob payment key error:', error.response?.data || error.message);
      throw new Error('Failed to generate payment key');
    }
  }

  async createPaymentIntent(
    bookingId: number,
    amountEGP: number,
    userInfo: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
    }
  ): Promise<{
    paymentKey: string;
    orderId: number;
    iframeUrl: string;
  }> {
    const amountCents = Math.round(amountEGP * 100);
    const merchantOrderId = `booking_${bookingId}_${Date.now()}`;

    const authToken = await this.authenticate();
    const orderId = await this.registerOrder(authToken, amountCents, merchantOrderId);
    const paymentKey = await this.getPaymentKey(authToken, orderId, amountCents, userInfo);

    const iframeUrl = `https://accept.paymob.com/api/acceptance/iframes/${this.config.iframeId}?payment_token=${paymentKey}`;

    return {
      paymentKey,
      orderId,
      iframeUrl,
    };
  }

  verifyWebhookSignature(data: any, receivedHmac: string): boolean {
    const crypto = require('crypto');

    const concatenatedString = [
      data.obj?.amount_cents || '',
      data.obj?.created_at || '',
      data.obj?.currency || '',
      data.obj?.error_occured || false,
      data.obj?.has_parent_transaction || false,
      data.obj?.id || '',
      data.obj?.integration_id || '',
      data.obj?.is_3d_secure || false,
      data.obj?.is_auth || false,
      data.obj?.is_capture || false,
      data.obj?.is_refunded || false,
      data.obj?.is_standalone_payment || false,
      data.obj?.is_voided || false,
      data.obj?.order?.id || '',
      data.obj?.owner || '',
      data.obj?.pending || false,
      data.obj?.source_data?.pan || '',
      data.obj?.source_data?.sub_type || '',
      data.obj?.source_data?.type || '',
      data.obj?.success || false,
    ].join('');

    const calculatedHmac = crypto
      .createHmac('sha512', this.config.hmacSecret)
      .update(concatenatedString)
      .digest('hex');

    return calculatedHmac === receivedHmac;
  }
}

export default new PaymobService();

