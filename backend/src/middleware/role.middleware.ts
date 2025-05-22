import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/apiError.js';

export const roleMiddleware = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new ApiError(401, 'Authentication required');
    }

    if (!allowedRoles.includes(req.user.role)) {
      throw new ApiError(403, 'Forbidden - Insufficient permissions');
    }

    next();
  };
};