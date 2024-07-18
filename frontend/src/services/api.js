import axios from 'axios';
import { getStoredUser, removeStoredUser } from '../utils/tokenUtils';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

api.interceptors.request.use(
  (config) => {
    const user = getStoredUser();
    if (user && user.token) {
      config.headers['Authorization'] = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      removeStoredUser();
      window.location = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;