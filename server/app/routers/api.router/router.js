const express = require('express');

module.exports = (app, data) => {
    const router = new express.Router();
    router.get('/forums', function(req, res, next) {
        data.forums
            .getAll()
            .then((result) => {
                res.json(result);
            });
    });

    router.get('/forums/:forum', function(req, res, next) {
        const forum = req.params.forum;

        data.forums
            .getSingle(forum)
            .then((result) => {
                const info = JSON.parse(result);
                if (info !== null) {
                    res.json(result);
                } else {
                    res.send('forum not found');
                }
            });
    });

    router.get('/forumstructure', function(req, res, next) {
        data.forums.getStructure()
            .then((result) => {
                res.json(result);
            });
    });

    return router;
};
