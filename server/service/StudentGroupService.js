const model = require('../model/StudentGroup');

const groupService = require('./GroupService');

const ValidationError = require('../model/error/ValidationError');

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

  console.info(`Groups found { content: ${JSON.stringify(studentGroups)} }`);

  return studentGroups;
};

const getGroupStudents = async (group) => {
  console.info(`Find group students. { groupId: ${group.id} }`);

  const groupStudents = await model.find({
    groupId: group.id
  }).exec();

  console.info(`Students found { content: ${JSON.stringify(groupStudents)} }`);

  return groupStudents;
};

const assignStudentToGroup = async ({ studentId, groupId }) => {
  const existingStudentGroup = await this.getByStudentIdAndGroupId({ studentId, groupId });
  if (existingStudentGroup) {
    throw new ValidationError(`Cannot assign to group, connection already exists. { studentId: ${studentId}, groupId: ${groupId} }`);
  }

  const createdEntity = await this.create({ studentId, groupId });
  await groupService.incrementStudentsCount({ id: groupId, value: 1 });
  return createdEntity;
};

module.exports = {
  get,
  create,
  getStudentGroups,
  getGroupStudents,
  getByStudentIdAndGroupId,
  assignStudentToGroup
};