import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

// Placeholder for Reports Module
router.get('/list', authenticate, (req, res) => {
  res.json({ message: 'Reports list (placeholder)' });
});

export default router;
