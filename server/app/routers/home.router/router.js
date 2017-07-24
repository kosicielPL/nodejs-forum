const express = require('express');

module.exports = (app, data, config) => {
    const router = new express.Router();
    const controller = require('./controller').init(app, data, config);

    /* GET home page. */
    router.get('/', (req, res, next) => {
        return controller.generateHomeView(req, res, next);
    });

    return router;
};
