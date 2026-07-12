import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { 
  getDashboardData, 
  getEmissionFactors, 
  createCarbonTransaction, 
  getSustainabilityGoals 
} from '../controllers/environment.controller';

const router = Router();

router.use(authenticate);

router.get('/dashboard', getDashboardData);
router.get('/emission-factors', getEmissionFactors);
router.post('/carbon-transactions', createCarbonTransaction);
router.get('/sustainability-goals', getSustainabilityGoals);

export default router;
