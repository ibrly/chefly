import { Router } from 'express';
import { authenticate, authorize } from '@chefly/shared';
import * as adminController from '../controllers/admin.controller';

const router = Router();

// All routes require ADMIN or SUPPORT role
router.use(authenticate);
router.use(authorize('ADMIN', 'SUPPORT'));

// Get all bookings with filters
router.get('/bookings', adminController.getAllBookings);

// Review booking (add admin notes)
router.put('/bookings/:id/review', adminController.reviewBooking);

// Get booking statistics
router.get('/stats', adminController.getBookingStats);

export default router;

