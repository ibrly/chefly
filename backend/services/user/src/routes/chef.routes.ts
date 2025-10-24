import { Router } from 'express';
import { authenticate, authorize } from '@chefly/shared';
import * as chefController from '../controllers/chef.controller';

const router = Router();

// Public routes
router.get('/', chefController.getAllChefs);
router.get('/search', chefController.searchChefs);
router.get('/:id', chefController.getChefById);

// Protected routes (Chef only)
router.post('/', authenticate, authorize('CHEF'), chefController.createChefProfile);
router.put('/:id', authenticate, authorize('CHEF'), chefController.updateChefProfile);

export default router;

