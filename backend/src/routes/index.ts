import { Router } from 'express';
import authRoutes from './auth.routes.js';
import softwareRoutes from './software.routes.js';
import requestRoutes from './request.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/software', softwareRoutes);
router.use('/requests', requestRoutes);

export default router;