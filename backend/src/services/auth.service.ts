import axios from 'axios';

interface User {
  id: number;
  email: string;
  role: string;
  fullName: string;
  department: string;
}

interface LoginResponse {
  user: User;
  token: string;
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>('http://localhost:5000/api/auth/login', {
    email,
    password
  });
  return response.data; // ✅ Now response.data is typed
};

export const getCurrentUser = async (token: string): Promise<User> => {
  const response = await axios.get<User>('http://localhost:5000/api/auth/me', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};
