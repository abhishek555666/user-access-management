import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface Software {
  id: number;
  name: string;
  description: string;
  accessLevels: string[];
  version: string;
  vendor: string;
}

interface CreateRequestData {
  softwareId: number;
  accessType: string;
  reason: string;
  userId?: number;
}

export const getSoftware = async (): Promise<Software[]> => {
  const token = localStorage.getItem('token');
  const response = await axios.get<Software[]>(`${API_URL}/software`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const createSoftware = async (data: Omit<Software, 'id'>): Promise<void> => {
  const token = localStorage.getItem('token');
  await axios.post(`${API_URL}/software`, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const createRequest = async (data: CreateRequestData): Promise<void> => {
  const token = localStorage.getItem('token');
  await axios.post(`${API_URL}/requests`, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
