import { Router } from 'express';
import { body } from 'express-validator';
import { authenticate } from '@chefly/shared';
import * as bookingController from '../controllers/booking.controller';

const router = Router();

// All booking routes require authentication
router.use(authenticate);

// Get my bookings (as client or chef)
router.get('/my', bookingController.getMyBookings);

// Get booking by ID
router.get('/:id', bookingController.getBookingById);

// Create booking
router.post(
  '/',
  [
    body('chefId').notEmpty(),
    body('eventDate').isISO8601(),
    body('eventDuration').isInt({ min: 1 }),
    body('eventLocation').isObject(),
    body('guestCount').isInt({ min: 1 }),
  ],
  bookingController.createBooking
);

// Update booking status (chef can accept/reject, client can cancel)
router.put('/:id/status', bookingController.updateBookingStatus);

// Complete booking (chef marks as completed)
router.put('/:id/complete', bookingController.completeBooking);

export default router;

