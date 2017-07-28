const express = require('express');

module.exports = (app, data, config) => {
    const router = new express.Router();
    const controller = require('./controller').init(app, data, config);

    router.get('/:title', (req, res, next) => {
        if (!req.user) {
            return Promise.resolve()
                .then(() => {
                    return res.redirect('/login');
                    });
            }
        return controller.showSearchResults(req, res, next);
    });

    return router;
};
