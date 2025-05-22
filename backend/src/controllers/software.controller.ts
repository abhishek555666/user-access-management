import { Request, Response } from 'express';
import { AppDataSource } from '../config/db.js';
import { Software } from '../entities/Software.js';
import { ApiError } from '../utils/apiError.js';
import { ApiResponse } from '../utils/apiResponse.js';

const softwareRepository = AppDataSource.getRepository(Software);

export const createSoftware = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, accessLevels, version, vendor } = req.body;

    if (!name || !description || !accessLevels || !version || !vendor) {
      throw new ApiError(400, 'All fields are required');
    }

    const existing = await softwareRepository.findOne({ where: { name } });
    if (existing) {
      throw new ApiError(400, 'Software with this name already exists');
    }

    const newSoftware = softwareRepository.create({
      name: name,
      description: description,
      accessLevels: accessLevels,
      version: version,
      vendor: vendor,
    });

    await softwareRepository.save(newSoftware);

    new ApiResponse(res, 201, newSoftware, 'Software created successfully');
  } catch (error: any) {
    if (error instanceof ApiError) {
      new ApiResponse(res, error.statusCode, null, error.message);
    } else {
      new ApiResponse(res, 500, null, 'Internal server error');
    }
  }
};

export const getSoftware = async (req: Request, res: Response): Promise<void> => {
  try {
    const allSoftware = await softwareRepository.find({
      order: { name: 'ASC' },
    });

    new ApiResponse(res, 200, allSoftware, 'Software list retrieved successfully');
  } catch (error) {
    new ApiResponse(res, 500, null, 'Internal server error');
  }
};
