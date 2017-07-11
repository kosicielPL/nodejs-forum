const express = require('express');

module.exports = (data) => {
    const router = new express.Router();
    const controller = require('./controller').init(data);

    router.get('/', (req, res) => {
        return controller.generateSettingsView(req, res);
    });

    return router;
};
