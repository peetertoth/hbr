const express = require('express');
const studentService = require('../service/StudentService');

const router = express.Router();

// Get
router.get('/', async (req, res) => {
    res.send(await studentService.get());
});

// Create
router.post('/', async (req, res) => {
    console.info(`Create student ${JSON.stringify(req.body)}`);

    await studentService.create(req.body);

    res.status(200).send();
});

module.exports = router;