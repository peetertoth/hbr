import axios from 'axios';

const BASE_URL = 'http://192.168.0.143:8000/api';

class AuthService {
  async getUser() {
    const res = await axios.get(BASE_URL + '/user/current', { withCredentials: true });
    return res.data;
  };

  async logoutUser() {
    const res = await axios.post(BASE_URL + '/user/logout', {}, { withCredentials: true });
    return res;
  };

  async loginUser({ email, password }) {
    const res = await axios.post(BASE_URL + '/user/login', { email, password }, { withCredentials: true });
    return res;
  };
};

export default new AuthService();
