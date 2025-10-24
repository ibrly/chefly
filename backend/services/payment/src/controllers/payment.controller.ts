import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import PaymobService from '../lib/paymob';

const prisma = new PrismaClient();
const paymob = new PaymobService();

export const createPaymentIntent = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const { bookingId } = req.body;

    if (!bookingId) {
      return res.status(400).json({
        success: false,
        error: 'Booking ID required',
      });
    }

    // Get booking with client info
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        client: true,
        payment: true,
      },
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found',
      });
    }

    if (booking.clientId !== userId) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized',
      });
    }

    if (booking.payment) {
      return res.status(400).json({
        success: false,
        error: 'Payment already exists for this booking',
      });
    }

    // Create payment intent with Paymob
    const paymentIntent = await paymob.createPaymentIntent(
      bookingId,
      Number(booking.totalPrice),
      {
        firstName: booking.client.firstName || booking.client.username,
        lastName: booking.client.lastName || 'User',
        email: booking.client.email,
        phone: booking.client.phone || '01000000000',
      }
    );

    // Create payment record
    const payment = await prisma.payment.create({
      data: {
        bookingId,
        amount: booking.totalPrice,
        status: 'PENDING',
        paymentMethod: 'paymob',
        paymobOrderId: String(paymentIntent.orderId),
        paymentDetails: {
          paymentKey: paymentIntent.paymentKey,
        },
      },
    });

    res.json({
      success: true,
      data: {
        payment,
        iframeUrl: paymentIntent.iframeUrl,
        paymentKey: paymentIntent.paymentKey,
      },
    });
  } catch (error) {
    console.error('CreatePaymentIntent error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create payment intent',
    });
  }
};

export const getPaymentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user!.userId;

    const payment = await prisma.payment.findUnique({
      where: { id },
      include: {
        booking: {
          include: {
            client: {
              select: {
                id: true,
                username: true,
              },
            },
            chef: {
              select: {
                id: true,
                username: true,
              },
            },
          },
        },
      },
    });

    if (!payment) {
      return res.status(404).json({
        success: false,
        error: 'Payment not found',
      });
    }

    // Check authorization
    if (
      payment.booking.clientId !== userId &&
      payment.booking.chefId !== userId
    ) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized',
      });
    }

    res.json({ success: true, data: payment });
  } catch (error) {
    console.error('GetPaymentById error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch payment',
    });
  }
};

export const handleWebhook = async (req: Request, res: Response) => {
  try {
    const webhookData = req.body;
    const receivedHmac = req.query.hmac as string;

    // Verify webhook signature
    if (!paymob.verifyWebhookSignature(webhookData, receivedHmac)) {
      console.error('[Paymob Webhook] Invalid signature');
      return res.status(403).json({
        success: false,
        error: 'Invalid signature',
      });
    }

    const transactionData = webhookData.obj;

    if (!transactionData) {
      return res.status(400).json({
        success: false,
        error: 'Invalid webhook data',
      });
    }

    // Find payment by Paymob order ID
    const payments = await prisma.payment.findMany({
      where: {
        paymobOrderId: String(transactionData.order.id),
      },
      include: {
        booking: true,
      },
    });

    if (payments.length === 0) {
      console.warn('[Paymob Webhook] Payment not found:', transactionData.order.id);
      return res.json({ received: true });
    }

    const payment = payments[0];
    const newStatus = transactionData.success ? 'COMPLETED' : 'FAILED';

    // Update payment
    await prisma.payment.update({
      where: { id: payment.id },
      data: {
        status: newStatus,
        paymobTransactionId: String(transactionData.id),
        paymentDetails: {
          ...payment.paymentDetails,
          transactionData,
          webhookReceivedAt: new Date().toISOString(),
        },
        completedAt: transactionData.success ? new Date() : null,
      },
    });

    // Update booking status if payment successful
    if (transactionData.success) {
      await prisma.booking.update({
        where: { id: payment.bookingId },
        data: {
          status: 'CONFIRMED',
        },
      });

      // TODO: Send notification to chef
      console.log('[Paymob Webhook] Payment successful, booking confirmed:', payment.bookingId);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('[Paymob Webhook] Processing error:', error);
    res.status(500).json({
      success: false,
      error: 'Webhook processing failed',
    });
  }
};

