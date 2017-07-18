const init = (app, data, config) => {
    const controller = {
        generateAllForumsView(req, res) {
            return data.categories.getAllForumsInCategories()
                .catch((error) => {
                    return res.send(error);
                })
                .then((result) => {
                    return res.render('forum/categories', {
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
                    return res.send(error);
                })
                .then((forum) => {
                    if (forum.length <= 0) {
                        return res.render('error', {
                            title: 'Error 404',
                            message: 'Forum not found',
                            error: {
                                status: 404,
                            },
                        });
                    }

                    return Promise.all([
                            data.threads
                            .getInForum(forum[0]._id, threadsPerPage, page),
                            data.threads
                            .getCountInForum(forum[0]._id),
                        ])
                        .then(([threads, threadsCount]) => {
                            let totalPages = threadsCount / threadsPerPage;
                            totalPages = Math.ceil(totalPages);

                            if (page > totalPages && page > 1) {
                                return res.redirect(
                                    '/forums/' + forumName
                                );
                            }

                            return res.render('forum/forum', {
                                title: forum[0].name,
                                forum: forum[0],
                                threads: threads,
                                currentPage: page * 1,
                                totalPages: totalPages * 1,
                                threadsCount: threadsCount * 1,
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
                return res.render('error', {
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
                    return res.send(error);
                })
                .then((resultThread) => {
                    if (resultThread === null) {
                        return res.render('error', {
                            title: 'Error 404',
                            message: 'Thread not found',
                            error: {
                                status: 404,
                            },
                        });
                    }

                    return Promise.all([
                            data.posts
                            .getInThread(resultThread._id, page, postsPerPage),
                            data.posts
                            .getCountInThread(resultThread._id),
                            data.forums
                            .getById(resultThread.forum),
                        ])
                        .catch((error) => {
                            return res.send(error);
                        })
                        .then(([posts, postsCount, forum]) => {
                            let totalPages = postsCount / postsPerPage;
                            totalPages = Math.ceil(totalPages);

                            if (page > totalPages && page > 1) {
                                return res.redirect(
                                    '/forums/thread/' +
                                    threadId
                                );
                            }

                            return res.render('forum/thread', {
                                title: resultThread.title,
                                thread: resultThread,
                                posts: posts,
                                forum: forum,
                                currentPage: page * 1,
                                totalPages: totalPages * 1,
                                threadsCount: postsCount * 1,
                            });
                        });
                });
        },

        generateNewThreadView(req, res) {
            return data.forums
                .getByCriteria('internalName', req.params.forum)
                .catch((error) => {
                    return res.send(error);
                })
                .then((resultForum) => {
                    if (resultForum.length <= 0) {
                        return res.send('forum not found');
                    }

                    return res.render('forum/newThread', {
                        title: 'Creating new thread',
                        forum: resultForum[0],
                    });
                });
        },

        createNewPost(req, res) {
            const content = req.body.content;

            if (content.length > config.forums.post.maximumLength) {
                return res.send('post too long');
            } else if (content.length < config.forums.post.minimumLength) {
                return res.send('post too short');
            }

            const threadId = data.generateObjectId(req.params.thread);
            const post = {
                thread: threadId,
                content: content,
                dateCreated: new Date(),
                dateUpdated: new Date(),
            };

            return data.threads.getById(threadId)
                .catch((error) => {
                    return res.send(error);
                })
                .then((resultThread) => {
                    if (resultThread === null) {
                        return res.render('error', {
                            title: 'Error 404',
                            message: 'Thread not found',
                            error: {
                                status: 404,
                            },
                        });
                    }
                    return data.posts.create(post)
                        .catch((error) => {
                            return res.send(error);
                        })
                        .then((resultPost) => {
                            data.threads
                                .addPost(resultThread._id, resultPost.id)
                                .catch((error) => {
                                    return res.send(error);
                                })
                                .then(() => {
                                    const url =
                                        '/forums/thread/' +
                                        threadId +
                                        '/#' +
                                        resultPost.id;

                                    app.io.emit('new-post', {
                                        user: 'Xpload',
                                        thread: resultThread.title,
                                        url: url,
                                    });

                                    return res.redirect(url);
                                });
                        });
                });
        },

        createNewThread(req, res) {
            const title = req.body.title;
            const content = req.body.content;

            if (title.length > config.forums.thread.titleMaximumLength) {
                return res.send('thread title too long');
            } else if (title.length < config.forums.thread.titleMinimumLength) {
                return res.send('thread title too short');
            } else if (content.length > config.forums.post.maximumLength) {
                return res.send('thread content too long');
            } else if (content.length < config.forums.post.minimumLength) {
                return res.send('thread content too short');
            }

            const forum = req.params.forum;
            const thread = {
                title: title,
                content: content,
                posts: [],
                dateCreated: new Date(),
                dateUpdated: new Date(),
            };

            return data.forums
                .getByCriteria('internalName', forum)
                .catch((error) => {
                    return res.send(error);
                })
                .then((resultForum) => {
                    if (resultForum.length <= 0) {
                        return res.render('error', {
                            title: 'Error 404',
                            message: 'Forum not found',
                            error: {
                                status: 404,
                            },
                        });
                    }
                    thread.forum = resultForum[0].id;
                    return data.threads
                        .create(thread)
                        .catch((error) => {
                            return res.send(error);
                        })
                        .then((resultThread) => {
                            const url = '/forums/thread/' + resultThread.id;
                            app.io.emit('new-thread', {
                                user: 'Xpload',
                                forum: resultForum[0].name,
                                url: url,
                            });

                            return res.redirect(url);
                        });
                });
        },
    };

    return controller;
};

module.exports = {
    init,
};
