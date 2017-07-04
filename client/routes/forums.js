const express = require('express');
const router = express.Router();
const db = require('../../data/databaseController.js');

// all forums
router.get('/', function(req, res, next) {
    db.getForums()
        .catch((error) => {
            res.redirect('/'); // ADD 404 ERROR PAGE
        })
        .then((result) => {
            res.render('forum/allForums', {
                title: 'Forums',
                categories: result,
            });
        });
});

// post new thread in forum
router.get('/:forum/new', function(req, res, next) {
    db.getForum(req.params.forum)
        .catch((error) => {
            res.redirect('/'); // ADD 404 ERROR PAGE
        })
        .then((forum) => {
            res.render('forum/newThread', {
                title: 'Creating new thread',
                forum: forum,
            });
        });
});

// view thread
router.get('/thread/:thread', function(req, res, next) {
    db.getThread(req.params.thread)
        .catch((error) => {
            res.redirect('/'); // ADD 404 ERROR PAGE
        })
        .then((result) => {
            // res.send(result);
            res.render('forum/thread', {
                title: result.title,
                thread: result,
            });
        });
});

// single forum
router.get('/:forum/:page?', function(req, res, next) {
    const threadsPerPage = 8;
    let forum = req.params.forum;
    let page = req.params.page;

    if (typeof page === 'undefined') {
        page = 1;
    }

    db.getForum(forum)
        .catch((error) => {
            res.redirect('/'); // ADD 404 ERROR PAGE
        })
        .then((forumData) => {
            forum = forumData;
            if (forum !== null) {
                Promise.all([
                        db.getForumThreads(forum._id, threadsPerPage, page),
                        db.getForumThreadsCount(forum._id),
                    ])
                    .catch((err) => {
                        res.send(err);
                    })
                    .then((result) => {
                        // res.send(result[0]);
                        let totalPages = result[1] / threadsPerPage;
                        totalPages = Math.ceil(totalPages);

                        res.render('forum/singleForum', {
                            title: forum.name,
                            forum: forum,
                            threads: result[0],
                            currentPage: page,
                            totalPages: totalPages,
                            threadsCount: result[1],
                        });
                    });
                // res.send(info);
            } else {
                res.send('forum not found');
            }
        });
});


module.exports = router;
