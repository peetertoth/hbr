import HttpClient from './base_http_client';

const getUser = async () => {
  const res = await HttpClient.GET('/user/current', false);
  return res.data;
};

const logoutUser = async () => {
  const res = await HttpClient.POST('/user/logout', {});
  return res;
};

const loginUser = async ({ email, password }) => {
  const res = await HttpClient.POST('/user/login', {
    email,
    password,
  });
  return res;
};

export default {
  getUser,
  logoutUser,
  loginUser,
};
