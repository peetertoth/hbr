const express = require('express');
const service = require('../service/GroupService');
const authService = require('../service/AuthService');

const validator = require('./validator/Validator');
const ValidationError = require('./error/ValidationError');
const ItemNotFoundError = require('./error/ItemNotFoundError');

const router = express.Router();
const entityType = 'Group';

// Get
router.get('/groups', authService.authenticationRequired, async (req, res) => {
  try {
    let entity = await service.get();
    res.send(entity);
  } catch (e) {
    res.status(500).send(e);
  }
});

// Get by id
router.get('/id/:id', authService.authenticationRequired, async (req, res, next) => {
  if (validator.validateRequestParam([ 'id' ], req.params, next)) {
    return;
  }

  let entityById = await service.getById(req.params);
  if (entityById) {
    res.send(entityById);
  } else {
    next(new ItemNotFoundError(entityType, req.params));
  }
});

// Search by name
router.get('/search/', authService.authenticationRequired, async (req, res, next) => {
  if (validator.validateRequestParam([ 'name' ], req.query, next)) {
    return;
  }

  let result = await service.searchByName(req.query);
  res.status(200).send(result);
});

// Create
router.post('/create', authService.authenticationRequired, async (req, res, next) => {
  if (validator.validateRequestParam([ 'name' ], req.body, next)) {
    return;
  }

  const groupWithSameName = await service.getByName(req.body);
  if (groupWithSameName) {
    next(new ValidationError(`Failed to create group. Name already taken. { name: ${req.body.name} }`));
    return;
  }

  let entity = await service.create(req.body);
  res.status(200).send(entity);
});

// Edit
router.post('/edit', authService.authenticationRequired, async (req, res, next) => {
  if (validator.validateRequestParam([ 'id', 'name' ], req.body, next)) {
    return;
  }

  // TODO Check name

  let entity = await service.edit(req.body);
  res.status(200).send(entity);
});

module.exports = router;