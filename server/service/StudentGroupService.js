const model = require('../model/StudentGroup');

const get = async () => {
  return await model.find({}).exec();
};

const create = async ({ studentId, groupId }) => {
  const entity = {
    studentId,
    groupId
  };

  return await model(entity).save();
};

const getByStudentIdAndGroupId = async ({ studentId, groupId }) => {
  const studentGroup = await model.findOne({ studentId, groupId });
  return studentGroup;
};

const getStudentGroups = async (student) => {
  console.info(`Find student groups. { studentId: ${student.id} }`);

  const studentGroups = await model.find({
    studentId: student.id
  }).exec();

  const groupIds = studentGroups.map(({ groupId }) => groupId);

  console.info(`Groups found { content: ${JSON.stringify(groupIds)} }`);

  return groupIds;
};

const getGroupStudents = async (group) => {
  console.info(`Find group students. { groupId: ${group.id} }`);

  const groupStudents = await model.find({
    groupId: group.id
  }).exec();

  const studentIds = groupStudents.map(({ studentId }) => studentId);

  console.info(`Students found { content: ${JSON.stringify(studentIds)} }`);

  return studentIds;
};

module.exports = {
  get,
  create,
  getStudentGroups,
  getGroupStudents,
  getByStudentIdAndGroupId
};