const student = require('../model/Student');

const get = async () => {
    return await student.find({}).exec();
};

const getById = async ({id}) => {
    return await student.findOne({_id: id}).exec();
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

module.exports = {
    get,
    getById,
    create
};