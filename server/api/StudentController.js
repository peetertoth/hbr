const express = require('express');
const studentService = require('../service/StudentService');

const validator = require('./validator/Validator');
const ValidationError = require('../model/error/ValidationError');
const ItemNotFoundError = require('../model/error/ItemNotFoundError');

const router = express.Router();
const entityType = 'Student';

// Get
router.get('/', async (req, res) => {
    let students = await studentService.get();
    res.send(students);
});

// Get by id
router.get('/:id', async (req, res, next) => {
    if (validator.validateRequestParam(['id'], req.params, next)) {
        return;
    }

    let studentById = undefined;

    try {
        studentById = await studentService.getById(req.params);
    } catch (e) {
        console.error(`Error during get student by id ${req.params.id}`, e);
        next(e);
        return;
    }

    if (studentById) {
        res.send(studentById);
    } else {
        next(new ItemNotFoundError(entityType, req.params));
    }
});

// Create
router.post('/', async (req, res, next) => {
    if (validator.validateRequestParam(['firstName', 'lastName', 'neptun'], req.body, next)) {
        return;
    }

    let studentWithSameNeptun = await studentService.getByNeptun(req.body);
    if (studentWithSameNeptun) {
        next(new ValidationError(`Cannot create student. Neptun already taken. { neptun: ${req.body.neptun} }`));
        return;
    }

    try {
        let createdStudent = await studentService.create(req.body);
        res.status(200).send(createdStudent);
    } catch (err) {
        next(err);
    }
});

// Assign to group
router.post('/assign_to_group', async (req, res, next) => {
    if (validator.validateRequestParam(['studentId', 'groupId'], req.body, next)) {
        return;
    }

    try {
        const assign = await studentService.assignToGroup(req.body);
        res.status(200).send(assign);
    } catch (err) {
        next(err);
    }
});

module.exports = router;