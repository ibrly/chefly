import { Router } from 'express';
import { authenticate, authorize } from '@chefly/shared';
import * as adminController from '../controllers/admin.controller';

const router = Router();

// All routes require ADMIN or SUPPORT role
router.use(authenticate);
router.use(authorize('ADMIN', 'SUPPORT'));

// User management
router.get('/users', adminController.getAllUsers);
router.put('/users/:id/status', authorize('ADMIN'), adminController.updateUserStatus);
router.put('/users/:id/role', authorize('ADMIN'), adminController.updateUserRole);

// Chef management
router.get('/chefs/pending', adminController.getPendingChefs);
router.put('/chefs/:id/approve', authorize('ADMIN'), adminController.approveChef);
router.put('/chefs/:id/reject', authorize('ADMIN'), adminController.rejectChef);

export default router;

