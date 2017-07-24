const express = require('express');

module.exports = (data) => {
    const router = new express.Router();
    const controller = require('./controller').init(data);

    /* GET users listing. */
    // router.get('/', function(req, res, next) {
    //     res.send('test');
    // });

    router.get('/profile/:user', (req, res) => {
        return controller.generateProfileView(req, res);
    });

    router.get('/signup', (req, res) => {
        return controller.generateSignupView(req, res);
    });

    router.post('/signup', (req, res) => {
        return controller.signup(req, res);
    });

    router.get('/login', (req, res) => {
        return controller.generateLoginView(req, res);
    });

    return router;
};
