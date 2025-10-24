import { Router } from 'express';
import { authenticate } from '@chefly/shared';
import * as chatController from '../controllers/chat.controller';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Get conversations list
router.get('/conversations', chatController.getConversations);

// Get messages with a specific user
router.get('/messages/:userId', chatController.getMessages);

// Mark conversation as read
router.put('/conversations/:userId/read', chatController.markConversationAsRead);

export default router;

