const express = require('express');
const router = express.Router();
const db = require('../../data/databaseController.js');

router.get('/', function(req, res, next) {
    Promise.all([
        db.getForums(),
    ]).then((result) => {
        // res.send(result);
        res.render('forum/allForums', {
            title: 'Forums',
            result: JSON.parse(result),
        });
    });
});

router.get('/:forum', function(req, res, next) {
    const forum = req.params.forum;
    db.getForum(forum)
        .then((result) => {
            const info = JSON.parse(result);
            if (info !== null) {
                // res.send(info);
                res.render('forum/singleForum', {
                    title: info.name,
                    forum: info.name,
                });
            } else {
                res.send('forum not found');
            }
        });
});

router.get('/:forum/new', function(req, res, next) {
    res.render('forum/newThread', {
        title: 'Create new thread',
    });
});

router.get('/:forum/:thread', function(req, res, next) {
    res.render('forum/thread', {
        title: 'Thread',
    });
});


module.exports = router;
