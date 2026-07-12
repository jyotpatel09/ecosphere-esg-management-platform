import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

// Placeholder for Governance Module
router.get('/metrics', authenticate, (req, res) => {
  res.json({ message: 'Governance metrics (placeholder)' });
});

export default router;
