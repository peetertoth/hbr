const model = require('../model/StudentVisit');

const visitService = require('./VisitService');
const studentService = require('./StudentService');

const get = async () => {
  return await model.find({}).exec();
};

const create = async ({ neptun, visitId }) => {
  let student = await studentService.getByNeptun({ neptun });
  let visit = await visitService.getById({ id: visitId });

  if (!student) {
    throw new Error(`Hallgató nem található: ${neptun}`);
  }

  let futureEntity = {
    studentId: student._id,
    visitId,
  };

  // Check existing
  let existing = await model.findOne(futureEntity).exec();
  if (existing) {
    console.info('Already Existing');
    return existing;
  }

  let groupFound = false;
  for (let i = 0; i < student.groups.length; i++) {
    if (student.groups[i]._id.toString() === visit.groupId) {
      groupFound = true;
      break;
    }
  }

  if (groupFound === false) {
    throw new Error(`Hallgató nem található: ${neptun}`);
  }

  const entity = {
    studentId: student._id,
    visitId
  };

  return await model(entity).save();
};

const setFound = async ({ studentId, visitId, foundAt }) => {
  let entity = await model.findOne({ studentId, visitId }).exec();

  entity.foundAt = foundAt;

  return await model(entity).save();
};

const setCalled = async ({ studentId, visitId, calledAt }) => {
  let entity = await model.findOne({ studentId, visitId }).exec();

  entity.calledAt = calledAt;

  return await model(entity).save();
};


const getVisitStudents = async (visit) => {
  console.info(`Find visit students. { visitId: ${visit.id} }`);

  const visitStudents = await model.find({
    visitId: visit.id
  }).exec();

  console.info(`Students found { content: ${JSON.stringify(visitStudents)} }`);

  return visitStudents;
};

module.exports = {
  get,
  create,
  setFound,
  setCalled,
  getVisitStudents,
};