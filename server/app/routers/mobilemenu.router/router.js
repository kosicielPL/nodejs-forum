const express = require('express');

module.exports = (data) => {
    const router = new express.Router();
    const controller = require('./controller').init(data);

    router.get('/forumstructure', (req, res) => {
        return controller.generateMenuStructure(req, res);
    });

    return router;
};
