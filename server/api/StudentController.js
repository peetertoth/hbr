const express = require('express');
const studentService = require('../service/StudentService');

const router = express.Router();

// Get
router.get('/', async (req, res) => {
    try {
        let students = await studentService.get();
        res.send(students);
    } catch (e) {
        res.status(500).send(e);
    }
});

// Get by id
router.get('/:id', async (req, res) => {
    try {
        let studentById = await studentService.getById(req.params);
        if (studentById) {
            res.send(studentById);
        } else {
            res.status(404).send(`Cannot find student by id ${req.params.id}`);
        }
    } catch (e) {
        res.status(500).send(e);
    }
});

// Create
router.post('/', async (req, res) => {
    try {
        let createdStudent = await studentService.create(req.body);
        res.status(200).send(createdStudent);
    } catch (err) {
        res.status(500).send(err);
    }

});

module.exports = router;