const express = require('express');
const router = express.Router();
const db = require('../../data/databaseController.js');

router.get('/forums', function(req, res, next) {
    Promise.all([
        db.getForums(),
    ]).then((result) => {
        res.json(result);
    });
});

router.get('/forums/:forum', function(req, res, next) {
    const forum = req.params.forum;
    db.getForum(forum)
        .then((result) => {
            const info = JSON.parse(result);
            if (info !== null) {
                res.json(result);
            } else {
                res.send('forum not found');
            }
        });
});

module.exports = router;
