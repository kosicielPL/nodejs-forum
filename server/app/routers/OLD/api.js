const express = require('express');
const router = express.Router();
const db = require('../../data/database.js');

router.get('/forums', function(req, res, next) {
    db.forums.getAll()
        .then((result) => {
            res.json(result);
        });
});

router.get('/forums/:forum', function(req, res, next) {
    const forum = req.params.forum;

    db.forums.getSingle(forum)
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
    db.forums.getStructure()
        .then((result) => {
            res.json(result);
        });
});

module.exports = router;
