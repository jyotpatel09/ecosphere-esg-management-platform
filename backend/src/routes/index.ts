import { Router } from 'express';
import authRoutes from './auth.routes';
import dashboardRoutes from './dashboard.routes';

// Future module routes (V2 Architecture)
import environmentModuleRoutes from './environment.routes';
import socialModuleRoutes from './social.routes';
import governanceModuleRoutes from './governance.routes';
import gamificationModuleRoutes from './gamification.routes';
import reportsModuleRoutes from './reports.routes';
import settingsModuleRoutes from './settings.routes';

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
