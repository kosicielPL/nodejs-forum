const express = require('express');
const router = new express.Router();

module.exports = (app, data) => {
    /* GET users listing. */
    router.get('/', function(req, res, next) {
        res.send('test');
    });

    router.get('/profile/:user', function(req, res, next) {
        const user = req.params.user;
        res.render('user/profile', {
            title: user + '\'s profile',
            user: user,
        });
    });

    router.get('/signup', function(req, res, next) {
        const user = req.params.user;
        res.render('user/signup', {
            title: 'Sign up',
        });
    });

    router.get('/login', function(req, res, next) {
        const user = req.params.user;
        res.render('user/login', {
            title: 'Log in',
        });
    });

    return router;
};
