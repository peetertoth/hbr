const student = require('../model/Student');

const get = async () => {
  return await student.find({}).exec();
};

const getById = async ({ id }) => {
  let aStudent = await student.findOne({ _id: id });

  if (aStudent) {
    const studentGroupService = require('./StudentGroupService');
    const groupService = require('./GroupService');

    const studentGroups = await studentGroupService.getStudentGroups(aStudent);
    const groupIds = studentGroups.map(({ groupId }) => groupId);
    const groups = await groupService.getByIdList(groupIds);

    for (let i = 0; i < groups.length; i++) {
      for (let j = 0; j < studentGroups.length; j++) {
        if (groups[i]._id.toString() === studentGroups[j].studentId) {
          groups[i] = { ...groups[i].toObject(), ...studentGroups[j].toObject() };
          break;
        }
      }
    }

    aStudent = { ...aStudent.toObject(), groups };
  }

  return aStudent;
};

const getByNeptun = async ({ neptun }) => {
  const entity = await student.findOne({ neptun });
  if (entity) {
    return getById({ id: entity.id });
  }
  return entity;
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

const createOrGet = async ({ firstName, lastName, neptun }) => {
  let existing = await student.findOne({ neptun: neptun });
  if (existing) {
    return existing;
  }

  let aStudent = {
    firstName,
    lastName,
    neptun,
    fullName: lastName + ' ' + firstName
  };

  return await student(aStudent).save();
};

const getByIdList = async (idList) => {
  const listOfStudents = await student.find({ _id: { $in: idList } });
  return listOfStudents;
};

module.exports = {
  get,
  getById,
  getByNeptun,
  create,
  createOrGet,
  getByIdList
};