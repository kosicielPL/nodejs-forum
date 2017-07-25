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

    return router;
};
