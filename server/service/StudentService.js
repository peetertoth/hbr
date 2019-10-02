const student = require('../model/Student');

const get = async () => {
    try {
        return await student.find({}).exec();
    } catch (e) {
        console.error(`Failed to get students`, e);
    }
}

const create = async ({firstName, lastName, neptun}) => {
    let aStudent = {
        firstName,
        lastName,
        neptun,
        fullName: lastName + ' ' + firstName
    };
    try {
        await new student(aStudent).save();
        console.info('Student create successfully');
    } catch (e) {
        console.error(`Failed to create Student: ${aStudent}`, e);
    }
};

module.exports = {
    get,
    create
};