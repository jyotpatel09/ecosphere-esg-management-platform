import { Router } from 'express';
import { environmentController } from './controller';

const router = Router();

router.get('/dashboard', environmentController.getDashboardData.bind(environmentController));
router.get('/factors', environmentController.getFactors.bind(environmentController));
router.post('/transactions', environmentController.createTransaction.bind(environmentController));
router.post('/goals', environmentController.createGoal.bind(environmentController));

export default router;
