const express = require('express');

module.exports = (app, data) => {
    const router = new express.Router();
    const controller = require('./controller').init(app, data);

    /* GET home page. */
    router.get('/', (req, res) => {
        return controller.generateHomeView(req, res);
    });

    return router;
};
