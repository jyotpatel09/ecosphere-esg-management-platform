import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import {
  getActivities,
  getActivityById,
  createActivity,
  updateActivity,
  deleteActivity,
  getKPIs
} from '../controllers/social.controller';

const router = Router();

router.use(authenticate);

router.get('/kpis', getKPIs);
router.get('/activities', getActivities);
router.get('/activities/:id', getActivityById);
router.post('/activities', createActivity);
router.put('/activities/:id', updateActivity);
router.delete('/activities/:id', deleteActivity);

export default router;
