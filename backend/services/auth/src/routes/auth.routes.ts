import { Router } from 'express';
import { body } from 'express-validator';
import * as authController from '../controllers/auth.controller';

const router = Router();

// Local authentication
router.post(
  '/register',
  [
    body('email').isEmail().normalizeEmail(),
    body('username').trim().isLength({ min: 3 }),
    body('password').isLength({ min: 6 }),
    body('role').optional().isIn(['CLIENT', 'CHEF']),
  ],
  authController.register
);

router.post(
  '/login',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty(),
  ],
  authController.login
);

router.post('/refresh', authController.refreshToken);
router.post('/logout', authController.logout);

// OAuth routes
router.get('/google', authController.googleAuth);
router.get('/google/callback', authController.googleCallback);

router.get('/facebook', authController.facebookAuth);
router.get('/facebook/callback', authController.facebookCallback);

export default router;

