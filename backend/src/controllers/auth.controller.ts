import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/apiError.js';
import { ApiResponse } from '../utils/apiResponse.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../entities/User.js';
import { AppDataSource } from '../config/db.js';

// Get user repository
const userRepository = AppDataSource.getRepository(User);

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      throw new ApiError(400, 'All fields are required');
    }

    const existingUser = await userRepository.findOne({ where: [{ email }, { username }] });

    if (existingUser) {
      throw new ApiError(400, 'User with this email or username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = userRepository.create({
      username,
      email,
      password: hashedPassword,
      role: 'employee', // default role, adjust if needed
    });

    await userRepository.save(user);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    next(error instanceof ApiError ? error : new ApiError(500, 'Internal server error'));
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ApiError(400, 'Email and password are required');
    }

    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      throw new ApiError(401, 'Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new ApiError(401, 'Invalid credentials');
    }

    // Create JWT payload (adjust payload as per your UserPayload interface)
    const payload = {
      id: user.id,
      username: user.username,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1d' });

    res.status(200).json({ token });
  } catch (error) {
    next(error instanceof ApiError ? error : new ApiError(500, 'Internal server error'));
  }
};

export const getCurrentUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user) {
      throw new ApiError(401, 'Unauthorized');
    }

    res.status(200).json({ user: req.user });
  } catch (error) {
    next(error instanceof ApiError ? error : new ApiError(500, 'Internal server error'));
  }
};
