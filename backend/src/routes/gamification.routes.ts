import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { getLeaderboard, getDashboardData } from '../controllers/gamification.controller';

const router = Router();

router.use(authenticate);

router.get('/dashboard', getDashboardData);
router.get('/leaderboard', getLeaderboard);

export default router;
