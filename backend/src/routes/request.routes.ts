import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { createRequest, getPendingRequests, updateRequestStatus } from '../controllers/request.controller.js';
import { roleMiddleware } from '../middleware/role.middleware.js';

const router = Router();

router.post('/',
  authMiddleware,
  roleMiddleware(['employee']),
  createRequest
);

router.get('/pending',
  authMiddleware,
  roleMiddleware(['manager']),
  getPendingRequests
);

router.patch('/:id',
  authMiddleware,
  roleMiddleware(['manager']),
  updateRequestStatus
);

export default router;