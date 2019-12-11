const express = require('express');
const visitService = require('../service/VisitService');

const validator = require('./validator/Validator');
// const ValidationError = require('../model/error/ValidationError');
const ItemNotFoundError = require('../model/error/ItemNotFoundError');

const router = express.Router();
const entityType = 'Visit';

// Get
router.get('/visits', async (req, res) => {
  let visits = await visitService.get();
  res.send(visits);
});

// Get by id
router.get('/id/:id', async (req, res, next) => {
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
router.post('/', async (req, res, next) => {
  if (validator.validateRequestParam(['name', 'groupId', 'startTime', 'endTime'], req.body, next)) {
    console.log('done validation failed');
    return;
  }
  console.log('done validation');

  try {
    let createdVisit = await visitService.create(req.body);
    res.status(200).send(createdVisit);
  } catch (err) {
    next(err);
  }
});

module.exports = router;