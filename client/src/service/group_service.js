import axios from 'axios';
import CONFIG from '../config';

const getGroups = async () => {
  const res = await axios.get(`${CONFIG.API_BASE_URL}/group/groups`, { withCredentials: true });
  return res.data;
};

const getGroupById = async (id) => {
  const res = await axios.get(`${CONFIG.API_BASE_URL}/group/id/${id}`, { withCredentials: true });
  return res.data;
};

const edit = async (id, name) => {
  const res = await axios.post(`${CONFIG.API_BASE_URL}/group/edit`, { id, name }, { withCredentials: true });
  return res.data;
};

export default {
  getGroups,
  getGroupById,
  edit,
};
