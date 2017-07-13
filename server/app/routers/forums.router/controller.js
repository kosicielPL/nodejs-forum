const ObjectId = require('mongodb').ObjectID;

const init = (app, data, config) => {
    const controller = {
        generateAllForumsView(req, res) {
            return data.categories.getAllForumsInCategories()
                .catch((error) => {
                    res.send(error); // ADD 404 ERROR PAGE
                })
                .then((result) => {
                    res.render('forum/allForums', {
                        title: 'Forums',
                        categories: result,
                    });
                });
        },

        generateSingleForumView(req, res) {
            let threadsPerPage = config.forums.forumView.threadsPerPage;
            const forumName = req.params.forum;
            let page = req.params.page;

            if (page < 1 || typeof page === 'undefined') {
                page = 1;
            }

            if (threadsPerPage < 1 || typeof threadsPerPage === 'undefined') {
                threadsPerPage = 1;
            }

            return data.forums
                .getByCriteria('internalName', forumName)
                .catch((error) => {
                    res.send(error); // ADD 404 ERROR PAGE
                })
                .then((forum) => {
                    if (forum.length <= 0) {
                        res.render('error', {
                            title: 'Error 404',
                            message: 'Forum not found',
                            error: {
                                status: 404,
                            },
                        });
                    }
                    Promise
                        .all([
                            data.threads.getInForum(forum[0]._id, threadsPerPage, page),
                            data.threads.getCountInForum(forum[0]._id),
                        ])
                        .catch((err) => {
                            res.send(err);
                        })
                        .then((result) => {
                            // res.send(result);
                            let totalPages = result[1] / threadsPerPage;
                            totalPages = Math.ceil(totalPages);
                            if (page > totalPages && page > 1) {
                                res.send('page doesnt exist'); // FIX ME LATER
                            }
                            res.render('forum/singleForum', {
                                title: forum[0].name,
                                forum: forum[0],
                                threads: result[0],
                                currentPage: page * 1,
                                totalPages: totalPages * 1,
                                threadsCount: result[1] * 1,
                            });
                        });
                });
        },

        generateSingleThreadView(req, res) {
            let postsPerPage = config.forums.threadView.postsPerPage;
            const threadId = req.params.thread;
            let page = req.params.page;

            if (page < 1 || typeof page === 'undefined') {
                page = 1;
            }

            if (postsPerPage < 1 || typeof postsPerPage === 'undefined') {
                postsPerPage = 1;
            }

            if (threadId.length !== 24) {
                res.render('error', {
                    title: 'Error 404',
                    message: 'Invalid thread ID',
                    error: {
                        status: 404,
                    },
                });
            }

            return data.threads
                .getById(threadId)
                .catch((error) => {
                    res.send(error); // ADD 404 ERROR PAGE
                })
                .then((thread) => {
                    if (thread.length <= 0) {
                        res.render('error', {
                            title: 'Error 404',
                            message: 'Thread not found',
                            error: {
                                status: 404,
                            },
                        });
                    }
                    Promise
                        .all([
                            data.posts.getInThread(thread[0]._id, page, postsPerPage),
                            data.posts.getCountInThread(thread[0]._id),
                            data.forums.getById(thread[0].forum),
                        ])
                        .catch((error) => {
                            res.send(error);
                        })
                        .then((result) => {
                            let totalPages = result[1] / postsPerPage;
                            totalPages = Math.ceil(totalPages);

                            if (page > totalPages && page > 1) {
                                res.send('page doesnt exist'); // FIX ME LATER
                            }

                            res.render('forum/thread', {
                                title: thread[0].title,
                                thread: thread[0],
                                posts: result[0],
                                forum: result[2][0],
                                currentPage: page * 1,
                                totalPages: totalPages * 1,
                                threadsCount: result[1] * 1,
                            });
                        });
                });
        },

        generateNewThreadView(req, res) {
            return data.forums.getByCriteria('internalName', req.params.forum)
                .catch((error) => {
                    res.send(error); // ADD 404 ERROR PAGE
                })
                .then((forum) => {
                    res.render('forum/newThread', {
                        title: 'Creating new thread',
                        forum: forum[0],
                    });
                });
        },

        createNewPost(req, res) {
            const content = req.body.content;
            const thread = new ObjectId(req.params.thread);
            const post = {
                thread: thread,
                content: content,
                dateCreated: new Date(),
                dateUpdated: new Date(),
            };

            return data.threads.getById(thread)
                .catch((error) => {
                    res.send(error); // ADD 404 ERROR PAGE
                })
                .then((resultThread) => { // ADD CHECK IF THREAD EXISTS
                    data.posts.create(post)
                        .catch((error) => {
                            res.send(error);
                        })
                        .then((resultPost) => {
                            // res.send(resultThread);
                            // res.send(resultPost);
                            const url = '/forums/thread/' + thread + '/#' + resultPost.id;
                            app.io.emit('new-post', {
                                user: 'Xpload',
                                thread: resultThread[0].title,
                                url: url,
                            });
                            res.redirect(url);
                        });
                });
        },

        createNewThread(req, res) {
            const title = req.body.title;
            const content = req.body.content;
            const forum = req.params.forum;
            const thread = {
                title: title,
                content: content,
                dateCreated: new Date(),
                dateUpdated: new Date(),
            };

            return data.forums.getByCriteria('internalName', forum)
                .catch((error) => {
                    res.send(error); // ADD 404 ERROR PAGE
                })
                .then((resultForum) => { // ADD CHECK IF FORUM EXISTS
                    thread.forum = resultForum[0].id;
                    data.threads.create(thread)
                        .catch((error) => {
                            res.send(error);
                        })
                        .then((resultThread) => {
                            // res.send(resultThread);
                            const url = '/forums/thread/' + resultThread.id;
                            app.io.emit('new-thread', {
                                user: 'Xpload',
                                forum: resultForum[0].name,
                                url: url,
                            });
                            res.redirect(url);
                        });
                });
        },
    };

    return controller;
};

module.exports = {
    init,
};
