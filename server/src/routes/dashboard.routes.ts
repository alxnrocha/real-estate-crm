import { Router } from 'express';
import { getDashboardMetrics, getRecentActivity } from '../controllers/dashboard.controller.js';
import { authenticateJWT } from '../middlewares/auth.middleware.js';

const router = Router();
router.use(authenticateJWT);

router.get('/overview', getDashboardMetrics);
router.get('/activity', getRecentActivity);

export default router;
