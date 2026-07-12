import { Router } from 'express';
import { socialController } from './controller';

const router = Router();

// CSR Activities
router.get('/activities', socialController.getActivities);
router.get('/activities/:id', socialController.getActivityById);
router.post('/activities', socialController.createActivity);
router.put('/activities/:id', socialController.updateActivity);
router.delete('/activities/:id', socialController.deleteActivity);

// KPIs
router.get('/kpis', socialController.getKPIs);

export default router;
