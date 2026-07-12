import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

// Placeholder for Environment Module
router.get('/metrics', authenticate, (req, res) => {
  res.json({ message: 'Environment metrics (placeholder)' });
});

export default router;
