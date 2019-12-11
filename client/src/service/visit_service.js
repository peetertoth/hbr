import HttpClient from './base_http_client';

const getVisits = async (showError = true) => {
  const res = await HttpClient.GET('/visit/visits', showError);
  return res.data;
};

const getVisitById = async (id, showError = true) => {
  const res = await HttpClient.GET(`/visit/id/${id}`, showError);
  return res.data;
};

const create = async ({
  name, groupId, startTime, endTime,
}, showError = true) => {
  const res = await HttpClient.POST('/visit/', {
    name, groupId, startTime, endTime,
  }, showError);
  return res.data;
};

const visitLogin = async ({
  neptun,
  visitId,
}, showError = true) => {
  const res = await HttpClient.POST('/visit/login', {
    neptun,
    visitId,
  }, showError);
  return res.data;
};

const setFound = async ({
  studentId,
  visitId,
  foundAt,
}, showError = true) => {
  const res = await HttpClient.POST('/visit/set_found', {
    studentId,
    visitId,
    foundAt: foundAt ? foundAt : null,
  }, showError);
  return res.data;
};

const setCalled = async ({
  studentId,
  visitId,
  calledAt,
}, showError = true) => {
  const res = await HttpClient.POST('/visit/set_called', {
    studentId,
    visitId,
    calledAt,
  }, showError);
  return res.data;
};

export default {
  getVisits,
  getVisitById,
  create,
  visitLogin,
  setFound,
  setCalled,
};
