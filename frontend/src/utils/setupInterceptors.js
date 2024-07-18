import axios from 'axios';
import { refreshToken } from '../services/authService';
import { getStoredUser, setStoredUser, removeStoredUser } from './tokenUtils';

const setup = () => {
  axios.interceptors.request.use(
    (config) => {
      const user = getStoredUser();
      if (user && user.token) {
        config.headers['Authorization'] = `Bearer ${user.token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;

      if (err.response) {
        // Token was expired
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;

          try {
            const rs = await refreshToken();
            const { token } = rs.data;
            const user = getStoredUser();
            setStoredUser({ ...user, token });
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            return axios(originalConfig);
          } catch (_error) {
            removeStoredUser();
            window.location = '/login';
            return Promise.reject(_error);
          }
        }
      }

      return Promise.reject(err);
    }
  );
};

export default setup;