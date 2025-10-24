import { Router } from 'express';
import { authenticate } from '@chefly/shared';
import * as notificationController from '../controllers/notification.controller';

const router = Router();

// Send notification (authenticated)
router.post('/send', authenticate, notificationController.sendNotification);

// Send notification to user (internal service-to-service)
router.post('/send-to-user', notificationController.sendToUser);

// Send notification to multiple users (internal service-to-service)
router.post('/send-to-users', notificationController.sendToUsers);

export default router;

