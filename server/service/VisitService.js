const visit = require('../model/Visit');

const create = async ({name, groupId, startTime, endTime}) => {
  const anEntity = {
    name,
    groupId,
    startTime,
    endTime,
  };
  return await visit(anEntity).save();
};

const getGroupNameById = async ({ id }) => {
  const groupService = require('./GroupService.js');

  const group = await groupService.getById({ id });

  return group.name;
};

const get = async () => {
  const visits = await visit.find({}).exec();
  for (let i = 0; i < visits.length; i++) {
    const groupName = await getGroupNameById({ id: visits[i].groupId });
    visits[i] = { ...visits[i].toObject(), groupName };
  }
  return visits;
};

const getById = async ({ id }) => {
  const aVisit = await visit.findOne({ _id: id }).exec();
  if (aVisit) {
    aVisit.groupName = await getGroupNameById({ id: aVisit.groupId });
  }
  return aVisit;
};

const getByGroupId = async ({ groupId }) => {
  let aVisit = await visit.findOne({ groupId }).exec();
  if (aVisit) {
    const groupName = await getGroupNameById({ id: aVisit.groupId });
    aVisit = { ...aVisit.toObject(), groupName };
  }
  return aVisit;
};

module.exports = {
  create,
  get,
  getById,
  getByGroupId,
};