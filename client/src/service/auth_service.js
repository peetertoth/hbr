import axios from 'axios';
import CONFIG from '../config';

const getUser = async () => {
  const res = await axios.get(`${CONFIG.API_BASE_URL}/user/current`, { withCredentials: true });
  return res.data;
};

const logoutUser = async () => {
  const res = await axios.post(`${CONFIG.API_BASE_URL}/user/logout`, {}, { withCredentials: true });
  return res;
};

const loginUser = async ({ email, password }) => {
  const res = await axios.post(`${CONFIG.API_BASE_URL}/user/login`, { email, password }, { withCredentials: true });
  return res;
};

export default {
  getUser,
  logoutUser,
  loginUser,
};
