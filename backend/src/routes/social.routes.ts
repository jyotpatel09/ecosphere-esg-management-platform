import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

// Placeholder for Social Module
router.get('/metrics', authenticate, (req, res) => {
  res.json({ message: 'Social metrics (placeholder)' });
});

export default router;
