import axios from 'axios';

const setup = () => {
  axios.interceptors.response.use(
    (res) => {
      const newToken = res.headers['new-token'];
      if (newToken) {
        const user = JSON.parse(localStorage.getItem('user'));
        user.token = newToken;
        localStorage.setItem('user', JSON.stringify(user));
      }
      return res;
    },
    (err) => {
      if (err.response.status === 401) {
        // Token expirado o inválido
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
      return Promise.reject(err);
    }
  );
};

export default setup;