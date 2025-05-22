import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../config/db.js';
import { AccessRequest as RequestEntity } from '../entities/AccessRequest.js';
import { User } from '../entities/User.js';
import { Software } from '../entities/Software.js';
import { ApiError } from '../utils/apiError.js';

const requestRepository = AppDataSource.getRepository(RequestEntity);
const userRepository = AppDataSource.getRepository(User);
const softwareRepository = AppDataSource.getRepository(Software);

export const createRequest = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user) {
      throw new ApiError(401, 'Unauthorized');
    }

    const { softwareId, accessType, reason } = req.body;
    const userId = req.user.id;

    if (!softwareId || !accessType || !reason) {
      throw new ApiError(400, 'All fields are required');
    }

    const software = await softwareRepository.findOne({ where: { id: softwareId } });
    if (!software) {
      throw new ApiError(404, 'Software not found');
    }

    if (!software.accessLevels.includes(accessType)) {
      throw new ApiError(400, 'Invalid access type for this software');
    }

    const request = requestRepository.create({
      user: { id: userId },
      software: { id: softwareId },
      accessType,
      reason,
      status: 'pending'
    });

    await requestRepository.save(request);

    res.status(201).json({ message: 'Access request created successfully', request });
  } catch (error) {
    next(error instanceof ApiError ? error : new ApiError(500, 'Internal server error'));
  }
};

export const getPendingRequests = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const requests = await requestRepository.find({
      where: { status: 'pending' },
      relations: ['user', 'software'],
      order: { createdAt: 'DESC' }
    });

    res.status(200).json({ requests, message: 'Pending requests retrieved' });
  } catch (error) {
    next(new ApiError(500, 'Internal server error'));
  }
};

export const updateRequestStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['approved', 'rejected'].includes(status)) {
      throw new ApiError(400, 'Invalid status');
    }

    const request = await requestRepository.findOne({
      where: { id: parseInt(id, 10) },
      relations: ['user', 'software']
    });

    if (!request) {
      throw new ApiError(404, 'Request not found');
    }

    request.status = status;
    await requestRepository.save(request);

    res.status(200).json({ request, message: 'Request status updated' });
  } catch (error) {
    next(error instanceof ApiError ? error : new ApiError(500, 'Internal server error'));
  }
};
