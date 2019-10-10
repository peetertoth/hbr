const express = require('express');
const service = require('../service/UserService');
const authService = require('../service/AuthService');

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const user = await service.create(req.body);
        res.status(200).send(user);
    } catch (err) {
        console.error(`Error during register user: ${err}`, err);
        res.status(500).send(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const aUser = await service.findByEmailAndPassword(req.body);

        req.session.user = aUser;
        await req.session.save();

        res.status(200).send(aUser);
    } catch (err) {
        console.error(`Error during login user: ${err}`, err);
        res.status(500).send(err);
    }
});

router.post('/logout', async (req, res) => {
    if (req.session.user) {
        req.session.destroy();
    }
    res.status(200).send();
});

router.get('/users', authService.authenticationRequired, async (req, res) => {
    try {
        res.send(await service.get());
    } catch (err) {
        res.status(500).send(e);
    }
});

module.exports = router;