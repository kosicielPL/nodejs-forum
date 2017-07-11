const express = require('express');
const router = new express.Router();

module.exports = (app, data) => {
    /* GET users listing. */
    router.get('/', function(req, res, next) {
        res.render('settings', {
            title: 'Settings',
        });
    });

    return router;
};
