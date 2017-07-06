const express = require('express');
const router = express.Router();
const db = require('../../data/database.js');
const io = require('../setupSocketio');

// all forums
router.get('/', function(req, res, next) {
    db.forums.getAll()
        .catch((error) => {
            res.send(error); // ADD 404 ERROR PAGE
        })
        .then((result) => {
            res.render('forum/allForums', {
                title: 'Forums',
                categories: result,
            });
        });
});

// get page for new thread in forum
router.get('/:forum/new', function(req, res, next) {
    db.forums.getSingle(req.params.forum)
        .catch((error) => {
            res.send(error); // ADD 404 ERROR PAGE
        })
        .then((forum) => {
            res.render('forum/newThread', {
                title: 'Creating new thread',
                forum: forum,
            });
        });
});

// post new thread in forum
router.post('/:forum/new', function(req, res, next) {
    const title = req.body.title;
    const content = req.body.content;
    const forum = req.params.forum;

    db.forums.getSingle(forum)
        .catch((error) => {
            res.send(error); // ADD 404 ERROR PAGE
        })
        .then((resultForum) => { // ADD CHECK IF FORUM EXISTS
            db.threads.createSingle(resultForum._id, title, content)
                .catch((error) => {
                    res.send(error);
                })
                .then((resultThread) => {
                    // res.send(resultThread);
                    io.send('newthread', {
                        user: 'Xpload',
                        forum: resultForum.name,
                    });
                    res.redirect('/forums/thread/' + resultThread);
                });
        });
});

// post new post in thread lol
router.post('/:thread/newpost', function(req, res, next) {
    const content = req.body.content;
    const thread = req.params.thread;

    db.threads.getSingle(thread)
        .catch((error) => {
            res.send(error); // ADD 404 ERROR PAGE
        })
        .then((resultThread) => { // ADD CHECK IF THREAD EXISTS
            db.posts.createSingle(resultThread._id, content)
                .catch((error) => {
                    res.send(error);
                })
                .then((resultPost) => {
                    // res.send(resultThread);
                    // res.send(resultPost);
                    res.redirect('/forums/thread/' + thread + '/#' + resultPost);
                });
        });
});

// view thread
router.get('/thread/:thread/:page?', function(req, res, next) {
    const threadsPerPage = 10;
    let thread = req.params.forum;
    let page = req.params.page;

    if (typeof page === 'undefined') {
        page = 1;
    }

    db.threads.getSingle(req.params.thread)
        .catch((threadError) => {
            res.send(threadError); // ADD 404 ERROR PAGE
        })
        .then((threadResult) => {
            thread = threadResult;
            Promise.all([
                    db.posts.getAllInThread(thread._id, threadsPerPage, page),
                    db.posts.getPostsInThreadCount(thread._id),
                ])
                .catch((postsError) => {
                    res.send(postsError);
                })
                .then((result) => {
                    // res.json(result);
                    let totalPages = result[1] / threadsPerPage;
                    totalPages = Math.ceil(totalPages);

                    if (page > totalPages && page > 1) {
                        res.send('page doesnt exist'); // FIX ME LATER
                    }
                    res.render('forum/thread', {
                        title: thread.title,
                        thread: thread,
                        posts: result[0],
                        currentPage: page * 1,
                        totalPages: totalPages * 1,
                        threadsCount: result[1] * 1,
                    });
                });
        });
});

// single forum
router.get('/:forum/:page?', function(req, res, next) {
    const threadsPerPage = 10;
    let forum = req.params.forum;
    let page = req.params.page;

    if (typeof page === 'undefined') {
        page = 1;
    }

    db.forums.getSingle(forum)
        .catch((error) => {
            res.send(error); // ADD 404 ERROR PAGE
        })
        .then((forumResult) => {
            forum = forumResult;
            if (forum !== null) {
                Promise.all([
                        db.threads.getAllInForum(forum._id, threadsPerPage, page),
                        db.threads.getAllInForumCount(forum._id),
                    ])
                    .catch((err) => {
                        res.send(err);
                    })
                    .then((result) => {
                        // res.send(result[0]);
                        let totalPages = result[1] / threadsPerPage;
                        totalPages = Math.ceil(totalPages);

                        if (page > totalPages && page > 1) {
                            res.send('page doesnt exist'); // FIX ME LATER
                        }
                        res.render('forum/singleForum', {
                            title: forum.name,
                            forum: forum,
                            threads: result[0],
                            currentPage: page * 1,
                            totalPages: totalPages * 1,
                            threadsCount: result[1] * 1,
                        });
                    });
                // res.send(info);
            } else {
                res.send('forum not found');
            }
        });
});


module.exports = router;
