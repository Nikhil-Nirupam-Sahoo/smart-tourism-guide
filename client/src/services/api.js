import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  me: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data),
};

export const destinationAPI = {
  getAll: (params) => api.get('/destinations', { params }),
  getById: (id) => api.get(`/destinations/${id}`),
  getFeatured: () => api.get('/destinations/featured'),
  getCategories: () => api.get('/destinations/categories'),
};

export const tripAPI = {
  getMyTrips: () => api.get('/trips'),
  getById: (id) => api.get(`/trips/${id}`),
  getByShare: (token) => api.get(`/trips/share/${token}`),
  create: (data) => api.post('/trips', data),
  update: (id, data) => api.put(`/trips/${id}`, data),
  delete: (id) => api.delete(`/trips/${id}`),
};

export const aiAPI = {
  chat: (data) => api.post('/ai/chat', data),
};

export const userAPI = {
  me: () => api.get('/users/me'),
  toggleFavorite: (destinationId) => api.post(`/users/me/favorites/${destinationId}`),
  getFavorites: () => api.get('/users/me/favorites'),
};

export const adminAPI = {
  getStats: () => api.get('/admin/stats'),
  getDestinations: (params) => api.get('/admin/destinations', { params }),
  updateDestination: (id, data) => api.patch(`/admin/destinations/${id}`, data),
  getUsers: () => api.get('/admin/users'),
};

export default api;
