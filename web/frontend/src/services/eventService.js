import apiClient from './apiClient';

export const eventService = {
  getAll: () => apiClient.get('/api/events').then(r => r.data),
  getOne: (id) => apiClient.get(`/api/events/${id}`).then(r => r.data),
  create: (data) => apiClient.post('/api/events', data).then(r => r.data),
  delete: (id) => apiClient.delete(`/api/events/${id}`).then(r => r.data),
  getAttendees: (id) => apiClient.get(`/api/events/${id}/attendees`).then(r => r.data),
};