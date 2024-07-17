import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth/';

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + 'login', { username, password })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    const token = this.getCurrentUser()?.token;
    if (token) {
      return axios.post(API_URL + 'logout', {}, {
        headers: { Authorization: 'Bearer ' + token }
      }).then(() => {
        localStorage.removeItem('user');
      });
    }
    localStorage.removeItem('user');
    return Promise.resolve();
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  register(username, email, password) {
    return axios.post(API_URL + 'register', {
      username,
      email,
      password
    });
  }
}

export default new AuthService();