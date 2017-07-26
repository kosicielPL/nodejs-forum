const express = require('express');

module.exports = (data) => {
    const router = new express.Router();
    const controller = require('./controller').init(data);

    router.get('/', (req, res, next) => {
        return controller.generateAboutView(req, res, next);
    });

    return router;
};
