import HttpClient from './base_http_client';

const getStudents = async (showError = true) => {
  const res = await HttpClient.GET('/student/students', showError);
  return res.data;
};

export default {
  getStudents,
};
