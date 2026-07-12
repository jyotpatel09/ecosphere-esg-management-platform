import { Router } from 'express';
import authRoutes from './auth.routes';
import dashboardRoutes from './dashboard.routes';

// Future module routes (V2 Architecture)
import environmentModuleRoutes from '../modules/environment/routes';
import socialModuleRoutes from '../modules/social/routes';
import governanceModuleRoutes from '../modules/governance/routes';
import gamificationModuleRoutes from '../modules/gamification/routes';
import reportsModuleRoutes from '../modules/reports/routes';
import settingsModuleRoutes from '../modules/settings/routes';

const router = Router();

// Legacy / Core Routes
router.use('/auth', authRoutes);
router.use('/dashboard', dashboardRoutes);

// Modular Routes Scaffold
router.use('/v2/environment', environmentModuleRoutes);
router.use('/v2/social', socialModuleRoutes);
router.use('/v2/governance', governanceModuleRoutes);
router.use('/v2/gamification', gamificationModuleRoutes);
router.use('/v2/reports', reportsModuleRoutes);
router.use('/v2/settings', settingsModuleRoutes);

export default router;
