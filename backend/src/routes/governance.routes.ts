import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { getDashboardData, getPolicies, getComplianceIssues } from '../controllers/governance.controller';

const router = Router();

router.use(authenticate);

router.get('/dashboard', getDashboardData);
router.get('/policies', getPolicies);
router.get('/compliance-issues', getComplianceIssues);

export default router;
