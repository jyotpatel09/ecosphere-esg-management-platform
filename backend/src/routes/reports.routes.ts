import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { getDashboardData } from '../controllers/reports.controller';

const router = Router();

router.use(authenticate);

router.get('/dashboard', getDashboardData);

export default router;
