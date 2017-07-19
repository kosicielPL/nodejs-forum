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

// get page for new thread in forum
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

// post new thread in forum
router.post('/:forum/new', function(req, res, next) {
    const title = req.body.title;
    const content = req.body.content;
    const forum = req.params.forum;

    db.getForum(forum)
        .catch((error) => {
            res.redirect('/'); // ADD 404 ERROR PAGE
        })
        .then((resultForum) => { // ADD CHECK IF FORUM EXISTS
            db.postNewThread(resultForum._id, title, content)
                .catch((error) => {
                    res.redirect('/');
                })
                .then((resultThread) => {
                    // res.send(resultThread);
                    res.redirect('/forums/thread/' + resultThread);
                });
        });
});

// post new post in thread lol
router.post('/:thread/newpost', function(req, res, next) {
    const content = req.body.content;
    const thread = req.params.thread;

    db.getThread(thread)
        .catch((error) => {
            res.send(error);
            res.redirect('/'); // ADD 404 ERROR PAGE
        })
        .then((resultThread) => { // ADD CHECK IF THREAD EXISTS
            db.postNewPost(resultThread._id, content)
                .catch((error) => {
                    res.send(error);
                    res.redirect('/');
                })
                .then((resultPost) => {
                    // res.send(resultThread);
                    // res.send(resultPost);
                    res.redirect('/forums/thread/' + thread + '/#' + resultPost);
                });
        });
});

// view thread
router.get('/thread/:thread', function(req, res, next) {
    db.getThread(req.params.thread)
        .catch((threadError) => {
            res.redirect('/'); // ADD 404 ERROR PAGE
        })
        .then((thread) => {
            db.getPostsInThread(thread._id)
                .catch((postsError) => {
                    res.redirect('/');
                })
                .then((posts) => {
                    // res.json(posts);
                    res.render('forum/thread', {
                        title: thread.title,
                        thread: thread,
                        posts: posts,
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
