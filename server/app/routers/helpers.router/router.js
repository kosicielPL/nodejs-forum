const express = require('express');

module.exports = (data) => {
    const router = new express.Router();
    const controller = require('./controller').init(data);

    router.get('/forums-structure', (req, res) => {
        return controller.generateMenuStructure(req, res);
    });

    router.get('/newest-threads', (req, res) => {
        return controller.generateNewestThreads(req, res);
    });

    return router;
};
