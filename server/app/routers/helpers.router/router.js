const express = require('express');

module.exports = (data, config) => {
    const router = new express.Router();
    const controller = require('./controller').init(data, config);

    router.get('/forums-structure', (req, res) => {
        return controller.generateMenuStructure(req, res);
    });

    router.get('/newest-threads', (req, res) => {
        return controller.generateNewestThreads(req, res);
    });

    return router;
};
