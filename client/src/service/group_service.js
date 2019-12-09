import HttpClient from './base_http_client';

const getGroups = async (showError = true) => {
  const res = await HttpClient.GET('/group/groups', showError);
  return res.data;
};

const getGroupById = async (id, showError = true) => {
  const res = await HttpClient.GET(`/group/id/${id}`, showError);
  return res.data;
};

const edit = async (id, name, showError = true) => {
  const res = await HttpClient.POST('/group/edit', { id, name }, showError);
  return res.data;
};

const create = async (name, showError = true) => {
  const res = await HttpClient.POST('/group/create', { name }, showError);
  return res.data;
};

export default {
  getGroups,
  getGroupById,
  edit,
  create,
};
