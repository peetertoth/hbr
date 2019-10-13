import axios from 'axios';
import CONFIG from '../config';

const getGroups = async () => {
  const res = await axios.get(`${CONFIG.API_BASE_URL}/group/groups`, { withCredentials: true });
  return res.data;
};

export default {
  getGroups,
};
