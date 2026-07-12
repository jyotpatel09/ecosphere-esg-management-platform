import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

// Placeholder for Dashboard Module
router.get('/overview', authenticate, (req, res) => {
  res.json({ message: 'Dashboard overview data (placeholder)' });
});

export default router;
