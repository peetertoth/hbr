import HttpClient from './base_http_client';

const getVisits = async (showError = true) => {
  const res = await HttpClient.GET('/visit/visits', showError);
  return res.data;
};

// const getStudentById = async (id, showError = true) => {
//   const res = await HttpClient.GET(`/student/id/${id}`, showError);
//   return res.data;
// };

const create = async ({
  name, groupId, startTime, endTime,
}, showError = true) => {
  const res = await HttpClient.POST('/visit/', {
    name, groupId, startTime, endTime,
  }, showError);
  return res.data;
};

export default {
  getVisits,
  create,
};
