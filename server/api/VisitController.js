const express = require('express');
const visitService = require('../service/VisitService');
const studentVisitService = require('../service/StudentVisitService');
const authService = require('../service/AuthService');

const validator = require('./validator/Validator');
const ItemNotFoundError = require('../model/error/ItemNotFoundError');

const router = express.Router();
const entityType = 'Visit';

// Get
router.get('/visits', authService.authenticationRequired, async (req, res) => {
  let visits = await visitService.get();
  res.send(visits);
});

// Get by id
router.get('/id/:id', authService.authenticationRequired, async (req, res, next) => {
  if (validator.validateRequestParam(['id'], req.params, next)) {
    return;
  }

  let visitById = undefined;

  try {
    visitById = await visitService.getById(req.params);
  } catch (e) {
    console.error(`Error during get visit by id ${req.params.id}`, e);
    next(e);
    return;
  }

  if (visitById) {
    res.send(visitById);
  } else {
    next(new ItemNotFoundError(entityType, req.params));
  }
});

// Create
router.post('/', authService.authenticationRequired, async (req, res, next) => {
  if (validator.validateRequestParam(['name', 'groupId', 'startTime', 'endTime'], req.body, next)) {
    return;
  }

  try {
    let createdVisit = await visitService.create(req.body);
    res.status(200).send(createdVisit);
  } catch (err) {
    next(err);
  }
});

// StudentVisit - login
router.post('/login', async (req, res, next) => {
  if (validator.validateRequestParam(['neptun', 'visitId'], req.body, next)) {
    return;
  }

  try {
    let createdStudentVisit = await studentVisitService.create(req.body);
    res.status(200).send(createdStudentVisit);
  } catch (err) {
    next(err);
  }
});

// StudentVisit - mark as found
router.post('/set_found', authService.authenticationRequired, async (req, res, next) => {
  if (validator.validateRequestParam(['studentId', 'visitId'], req.body, next)) {
    return;
  }

  try {
    let updated = await studentVisitService.setFound(req.body);
    res.status(200).send(updated);
  } catch (err) {
    next(err);
  }
});

// StudentVisit - mark as called
router.post('/set_called', authService.authenticationRequired, async (req, res, next) => {
  if (validator.validateRequestParam(['studentId', 'visitId'], req.body, next)) {
    return;
  }

  try {
    let updated = await studentVisitService.setCalled(req.body);
    res.status(200).send(updated);
  } catch (err) {
    next(err);
  }
});


module.exports = router;