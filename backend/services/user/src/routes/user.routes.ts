import { Router } from 'express';
import { authenticate } from '@chefly/shared';
import * as userController from '../controllers/user.controller';

const router = Router();

// Get current user
router.get('/me', authenticate, userController.getMe);

// Update current user
router.put('/me', authenticate, userController.updateMe);

// Get user by ID (public profile)
router.get('/:id', userController.getUserById);

// Save push token
router.post('/push-token', authenticate, userController.savePushToken);

export default router;

