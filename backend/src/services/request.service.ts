import { AppDataSource } from '../config/db.js';
import { AccessRequest } from '../entities/AccessRequest.js';
import { User } from '../entities/User.js';
import { Software } from '../entities/Software.js';

export const RequestService = {
  async createRequest(userId: number, softwareId: number, accessType: string, reason: string) {
    const requestRepository = AppDataSource.getRepository(AccessRequest);

    const user = { id: userId.toString() } as unknown as User;
    const software = { id: softwareId } as Software;

    const request = requestRepository.create({
      user,
      software,
      accessType,
      reason,
      status: 'pending', // ensure this exists in AccessRequest entity
    });

    return await requestRepository.save(request);
  },

  async getPendingRequests() {
    const requestRepository = AppDataSource.getRepository(AccessRequest);

    return await requestRepository.find({
      where: { status: 'pending' }, // ensure 'status' exists in AccessRequest entity
      relations: ['user', 'software'],
      order: { createdAt: 'DESC' }, // ensure 'createdAt' exists in AccessRequest entity
    });
  },

  async updateRequestStatus(id: number, status: 'approved' | 'rejected') {
    const requestRepository = AppDataSource.getRepository(AccessRequest);

    const request = await requestRepository.findOne({
      where: { id }, // ensure 'id' is defined in AccessRequest entity
      relations: ['user', 'software'],
    });

    if (!request) {
      throw new Error('Request not found');
    }

    request.status = status;
    return await requestRepository.save(request);
  }
};
