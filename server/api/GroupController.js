const express = require('express');
const service = require('../service/GroupService');

const router = express.Router();
const entityType = 'Group';

// Get
router.get('/', async (req, res) => {
    try {
        let entity = await service.get();
        res.send(entity);
    } catch (e) {
        res.status(500).send(e);
    }
});

// Get by id
router.get('/id/:id', async (req, res) => {
    try {
        let entityById = await service.getById(req.params);
        if (entityById) {
            res.send(entityById);
        } else {
            res.status(404).send(`Cannot find ${entityType} by id ${req.params.id}`);
        }
    } catch (e) {
        res.status(500).send(e);
    }
});

// Search by name
router.get('/search/', async (req, res) => {
    try {
        let result = await service.searchByName(req.query);
        res.status(200).send(result);
    } catch (e) {
        res.status(500).send(e);
    }
});

// Create
router.post('/', async (req, res) => {
    try {
        let entity = await service.create(req.body);
        res.status(200).send(entity);
    } catch (err) {
        res.status(500).send(err);
    }

});

module.exports = router;