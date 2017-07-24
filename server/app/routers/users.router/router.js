const express = require('express');
const passport = require('passport');

module.exports = (data) => {
    const router = new express.Router();
    const controller = require('./controller').init(data);

    /* GET users listing. */
    // router.get('/', function(req, res, next, next) {
    //     res.send('test');
    // });

    router.get('/profile/:user', (req, res, next) => {
        return controller.generateProfileView(req, res, next);
    });

    router.get('/signup', (req, res, next) => {
        return controller.generateSignupView(req, res, next);
    });

    router.post('/signup', (req, res, next) => {
        return controller.signup(req, res, next);
    });

    router.get('/login', (req, res, next) => {
        return controller.generateLoginView(req, res, next);
    });

    router.post('/login', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/users/login',
        failureFlash: true,
    }));

    return router;
};
