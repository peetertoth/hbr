const student = require('../model/Student');
const studentGroupService = require('./StudentGroupService');
const groupService = require('./GroupService');

const get = async () => {
    return await student.find({}).exec();
};

const getById = async ({id}) => {
    let aStudent = await student.findOne({_id: id});
    const groups = await studentGroupService.getStudentGroups(aStudent);

    aStudent = {...aStudent.toObject(), groups};

    return aStudent;
};

const create = async ({firstName, lastName, neptun}) => {
    let aStudent = {
        firstName,
        lastName,
        neptun,
        fullName: lastName + ' ' + firstName
    };
    return await student(aStudent).save();
};

const assignToGroup = async ({studentId, groupId}) => {
    const createdEntity = await studentGroupService.create({studentId, groupId});
    await groupService.incrementStudentsCount({ id: groupId, value: 1 });
    return createdEntity;
};

module.exports = {
    get,
    getById,
    create,
    assignToGroup
};