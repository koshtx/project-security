import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/users/';

class UserService {
  getAllUsers() {
    return axios.get(API_URL, { headers: authHeader() });
  }

  getUserByUsername(username) {
    return axios.get(API_URL + username, { headers: authHeader() });
  }

  updateUser(id, user) {
    return axios.put(API_URL + id, user, { headers: authHeader() });
  }

  deleteUser(id) {
    return axios.delete(API_URL + id, { headers: authHeader() });
  }
}

export default new UserService();