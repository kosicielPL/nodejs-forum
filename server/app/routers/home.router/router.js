const express = require('express');

module.exports = (app, data) => {
    const router = new express.Router();
    /* GET home page. */
    router.get('/', function(req, res, next) {
        res.render('index', {
            title: 'Big Test Icicles',
        });
    });

    return router;
};
