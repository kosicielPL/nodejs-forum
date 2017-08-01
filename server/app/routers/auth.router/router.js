const express = require('express');

module.exports = (data, config) => {
    const router = new express.Router();
    const controller = require('./controller').init(data, config);

    router.get('/signup', (req, res, next) => {
        if (req.user) {
            return res.redirect('/');
        }
        return controller.generateSignupView(req, res, next);
    });

    router.post('/signup', (req, res, next) => {
        if (req.user) {
            return res.redirect('/');
        }
        return controller.signup(req, res, next);
    });

    router.get('/login', (req, res, next) => {
        if (req.user) {
            return res.redirect('/');
        }
        return controller.generateLoginView(req, res, next);
    });

    router.post('/login', (req, res, next) => {
        if (req.user) {
            return res.redirect('/');
        }
        return controller.login(req, res, next);
    });

    router.get('/logout', (req, res, next) => {
        return controller.logout(req, res, next);
    });

    return router;
};
