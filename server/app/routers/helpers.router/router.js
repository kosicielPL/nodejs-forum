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

    router.get('/checkusername', (req, res) => {
        return controller.checkUsername(req, res);
    });

    router.get('/checkemail', (req, res) => {
        return controller.checkEmail(req, res);
    });

    return router;
};
