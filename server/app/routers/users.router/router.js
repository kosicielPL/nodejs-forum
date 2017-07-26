const express = require('express');
const passport = require('passport');

module.exports = (data) => {
    const router = new express.Router();
    const controller = require('./controller').init(data);

    router.get('/', function(req, res, next) {
        return controller.generateUsersView(req, res, next);
    });

    router.get('/profile/:user', (req, res, next) => {
        return controller.generateProfileView(req, res, next);
    });

    return router;
};
