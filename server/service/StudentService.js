const student = require('../model/Student');
const studentGroupService = require('./StudentGroupService');
const groupService = require('./GroupService');

const ValidationError = require('../model/error/ValidationError');

const get = async () => {
  return await student.find({}).exec();
};

const getById = async ({ id }) => {
  let aStudent = await student.findOne({ _id: id });

  if (aStudent) {
    const groups = await studentGroupService.getStudentGroups(aStudent);

    aStudent = { ...aStudent.toObject(), groups };
  }

  return aStudent;
};

const getByNeptun = async ({ neptun }) => {
  return await student.findOne({ neptun });
};

const create = async ({ firstName, lastName, neptun }) => {
  let aStudent = {
    firstName,
    lastName,
    neptun,
    fullName: lastName + ' ' + firstName
  };
  return await student(aStudent).save();
};

const assignToGroup = async ({ studentId, groupId }) => {
  const existingStudentGroup = await studentGroupService.getByStudentIdAndGroupId({ studentId, groupId });
  if (existingStudentGroup) {
    throw new ValidationError(`Cannot assign to group, connection already exists. { studentId: ${studentId}, groupId: ${groupId} }`);
  }

  const createdEntity = await studentGroupService.create({ studentId, groupId });
  await groupService.incrementStudentsCount({ id: groupId, value: 1 });
  return createdEntity;
};

module.exports = {
  get,
  getById,
  getByNeptun,
  create,
  assignToGroup
};