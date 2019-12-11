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

  const group = await groupService.getById({ id }, false);

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
  let aVisit = await visit.findOne({ _id: id }).exec();
  if (aVisit) {
    let groupName = await getGroupNameById({ id: aVisit.groupId });

    const studentVisitService = require('./StudentVisitService');
    const studentService = require('./StudentService');

    const visitStudents = await studentVisitService.getVisitStudents(aVisit);
    const studentIds = visitStudents.map(({ studentId }) => studentId);
    const students = await studentService.getByIdList(studentIds);

    for (let i = 0; i < students.length; i++) {
      for (let j = 0; j < visitStudents.length; j++) {
        if (students[i]._id.toString() === visitStudents[j].studentId) {
          students[i] = { ...students[i].toObject(), ...visitStudents[j].toObject() };
          break;
        }
      }
    }

    aVisit = { ...aVisit.toObject(), groupName, students };
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