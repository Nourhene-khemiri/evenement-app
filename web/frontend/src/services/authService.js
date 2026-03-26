import apiClient from './apiClient';

export const authService = {
  login: (credentials) => apiClient.post('/api/auth/login', credentials).then(r => r.data),
  register: (data) => apiClient.post('/api/auth/register', data).then(r => r.data),
  me: () => apiClient.get('/api/auth/me').then(r => r.data),
};