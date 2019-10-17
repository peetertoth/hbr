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

router.post('/login', async (req, res, next) => {
    try {
        const aUser = await service.findByEmailAndPassword(req.body);

        req.session.user = aUser;
        await req.session.save();

        res.status(200).send(aUser);
    } catch (err) {
        console.error(`Error during login user: ${err}`, err);
        next(err);
    }
});

router.post('/logout', async (req, res) => {
    console.log('logout user called', req.session.user);
    if (req.session.user) {
        console.log('destroy session');
        req.session.destroy();
    }
    res.status(200).send();
});

router.get('/users', authService.authenticationRequired, async (req, res, next) => {
    try {
        res.send(await service.get());
    } catch (err) {
        next(e);
    }
});

router.get('/current', authService.authenticationRequired, async (req, res) => {
    console.log('get current user', req.session.user);
    res.status(200).send(req.session.user);
});

module.exports = router;