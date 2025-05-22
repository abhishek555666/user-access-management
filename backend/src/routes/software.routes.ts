import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { roleMiddleware } from '../middleware/role.middleware.js';
import { createSoftware, getSoftware } from '../controllers/software.controller.js';

const router = Router();

router.post(
  '/',
  authMiddleware,
  roleMiddleware(['admin', 'manager']),
  (req, res) => createSoftware(req, res)
);

router.get(
  '/',
  authMiddleware,
  (req, res) => getSoftware(req, res)
);

export default router;
