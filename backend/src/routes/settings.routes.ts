import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth.middleware';

const router = Router();

// Placeholder for Settings Module
router.get('/config', authenticate, authorize(['ADMIN']), (req, res) => {
  res.json({ message: 'System configuration (placeholder)' });
});

export default router;
