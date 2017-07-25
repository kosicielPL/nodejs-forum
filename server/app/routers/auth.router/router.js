const express = require('express');
const passport = require('passport');

module.exports = (data) => {
    const router = new express.Router();
    const controller = require('./controller').init(data);

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
        failureRedirect: '/login',
        failureFlash: true,
    }));

    router.get('/logout', (req, res, next) => {
        return controller.logout(req, res, next);
    });

    return router;
};
