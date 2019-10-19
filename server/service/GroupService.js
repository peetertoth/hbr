const group = require('../model/Group');

const get = async () => {
  return await group.find({}).exec();
};

const getById = async ({ id }) => {
  let aGroup = await group.findOne({ _id: id }).exec();
  if (aGroup) {
    const studentGroupService = require('./StudentGroupService');
    const studentService = require('./StudentService');

    const groupStudents = await studentGroupService.getGroupStudents(aGroup);
    const studentIds = groupStudents.map(({ studentId }) => studentId);
    const students = await studentService.getByIdList(studentIds);

    for (let i = 0; i < students.length; i++) {
      for (let j = 0; j < groupStudents.length; j++) {
        if (students[i]._id.toString() === groupStudents[j].studentId) {
          students[i] = { ...students[i].toObject(), ...groupStudents[j].toObject() };
          break;
        }
      }
    }

    aGroup = { ...aGroup.toObject(), students };
  }

  return aGroup;
};

const getByName = async ({ name }) => {
  return await group.findOne({ name });
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

const edit = async({ id, name }) => {
  const res = await group.updateOne({ _id: id }, { $set: { name }});
};

const getByIdList = async (idList) => {
  const listOfGroups = await group.find({ _id: { $in: idList } });
  return listOfGroups;
};

module.exports = {
  get,
  getById,
  getByName,
  searchByName,
  create,
  incrementStudentsCount,
  edit,
  getByIdList,
};