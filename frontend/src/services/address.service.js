import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/addresses/';

class AddressService {
  addAddress(address) {
    return axios.post(API_URL, address, { headers: authHeader() });
  }

  getAddressById(id) {
    return axios.get(API_URL + id, { headers: authHeader() });
  }

  updateAddress(id, address) {
    return axios.put(API_URL + id, address, { headers: authHeader() });
  }

  deleteAddress(id) {
    return axios.delete(API_URL + id, { headers: authHeader() });
  }
}

export default new AddressService();