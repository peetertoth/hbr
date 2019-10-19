import HttpClient from './base_http_client';

const getStudents = async (showError = true) => {
  const res = await HttpClient.GET('/student/students', showError);
  return res.data;
};

const getStudentById = async (id, showError = true) => {
  const res = await HttpClient.GET(`/student/id/${id}`, showError);
  return res.data;
};

export default {
  getStudents,
  getStudentById,
};
