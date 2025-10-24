import { Router } from 'express';
import { authenticate } from '@chefly/shared';
import * as paymentController from '../controllers/payment.controller';

const router = Router();

// Create payment intent (authenticated)
router.post('/intent', authenticate, paymentController.createPaymentIntent);

// Get payment by ID (authenticated)
router.get('/:id', authenticate, paymentController.getPaymentById);

// Paymob webhook (public, but verified with HMAC)
router.post('/webhook', paymentController.handleWebhook);

export default router;

