import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { getSystemPreferences, updateSystemPreferences, getUsers } from '../controllers/settings.controller';

const router = Router();

router.use(authenticate);

router.get('/preferences', getSystemPreferences);
router.put('/preferences', updateSystemPreferences);
router.get('/users', getUsers);

export default router;
