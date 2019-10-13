const group = require('../model/Group');
const studentGroupService = require('./StudentGroupService');

const get = async () => {
  return await group.find({}).exec();
};

const getById = async ({ id }) => {
  let aGroup = await group.findOne({ _id: id }).exec();
  const students = await studentGroupService.getGroupStudents(aGroup);

  aGroup = { ...aGroup.toObject(), students };

  return aGroup;
};

const searchByName = async ({ name }) => {
  return await group.find({ name: { $regex: `\\Q${name}\\E` } });
};

const create = async ({ name }) => {
  let anEntity = {
    name,
    studentsCount: 0
  };
  return await group(anEntity).save();
};

const incrementStudentsCount = async ({ id, value }) => {
  const res = await group.updateOne({ _id: id }, { $inc: { studentsCount: value } });
};

module.exports = {
  get,
  getById,
  searchByName,
  create,
  incrementStudentsCount
};