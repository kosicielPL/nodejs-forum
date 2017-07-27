const init = (app, data, config) => {
    const controller = {
        async generateAllForumsView(req, res, next) {
            const dbCategories =
                await data.categories.getAll();

            return res.render('forum/categories', {
                title: 'Forums',
                categories: dbCategories,
            });
        },

        async generateSingleForumView(req, res, next) {
            let threadsPerPage = config.forums.forumView.threadsPerPage;
            const forumName = req.params.forum;
            let page = req.params.page;
            const search = req.query.search;

            if (page < 1 || typeof page === 'undefined') {
                page = 1;
            }

            if (threadsPerPage < 1 || typeof threadsPerPage === 'undefined') {
                threadsPerPage = 1;
            }

            let dbForum =
                await data.forums.getByCriteria('internalName', forumName);

            if (!dbForum || dbForum.length <= 0) {
                return res.render('error', {
                    title: 'Error 404',
                    message: 'Forum not found',
                    error: {
                        status: 404,
                    },
                });
            }

            dbForum = dbForum[0];

            let dbThreads =
                await data.threads.getInForum(
                    dbForum._id, threadsPerPage, page
                );

            if (search) {
                dbThreads = dbThreads.filter((thread) => {
                    return thread.title.toLowerCase().includes(search);
                });
            }

            const dbThreadsCount = dbForum.threads.length;

            let totalPages = dbThreadsCount / threadsPerPage;
            totalPages = Math.ceil(totalPages);

            if (page > totalPages && page > 1) {
                return res.redirect(
                    '/forums/' + forumName
                );
            }

            return res.render('forum/forum', {
                title: dbForum.name,
                forum: dbForum,
                threads: dbThreads,
                currentPage: page * 1,
                totalPages: totalPages * 1,
                threadsCount: dbThreadsCount * 1,
            });
        },

        async generateSingleThreadView(req, res, next) {
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

            const dbThread = await data.threads.getById(threadId);

            if (dbThread === null) {
                return res.render('error', {
                    title: 'Error 404',
                    message: 'Thread not found',
                    error: {
                        status: 404,
                    },
                });
            }

            const dbPosts =
                await data.posts.getInThread(dbThread._id, page, postsPerPage);

            const dbForum =
                await data.forums.getById(dbThread.forum);

            const postsCount = dbThread.posts.length;
            let totalPages = postsCount / postsPerPage;
            totalPages = Math.ceil(totalPages);

            if (page > totalPages && page > 1) {
                return res.redirect(
                    '/forums/thread/' +
                    threadId
                );
            }
            // return res.send(dbPosts);
            return res.render('forum/thread', {
                title: dbThread.title,
                thread: dbThread,
                posts: dbPosts,
                forum: dbForum,
                currentPage: page * 1,
                totalPages: totalPages * 1,
                threadsCount: postsCount * 1,
            });
        },

        async generateNewThreadView(req, res, next) {
            const dbForum = await data.forums
                .getByCriteria('internalName', req.params.forum);

            if (dbForum.length <= 0) {
                return res.send('Forum not found');
            }

            if (dbForum[0].admin === true &&
                req.user.role !== 'admin') {
                return res.redirect('/');
            }

            return res.render('forum/newThread', {
                title: 'Creating new thread',
                forum: dbForum[0],
            });
        },

        async createNewPost(req, res, next) {
            const validate = require('../../validator').init(config.forums);
            const content = req.body.content;
            const threadId = req.params.thread;

            if (threadId.length !== 24) {
                return res.render('error', {
                    title: 'Error 404',
                    message: 'Invalid thread id',
                    error: {
                        status: 404,
                    },
                });
            }

            try {
                await validate.post(content);
            } catch (error) {
                res.send(error);
            }

            let dbThread = null;
            dbThread = await data.threads.getById(threadId);

            if (dbThread === null) {
                return res.render('error', {
                    title: 'Error 404',
                    message: 'Thread not found',
                    error: {
                        status: 404,
                    },
                });
            }

            const createdPost =
                await createNewPostInDb(data, req.user, content, dbThread);

            const postsPerPage = config.forums.threadView.postsPerPage;
            const totalPages = Math.ceil(
                (dbThread.posts.length + 1) / postsPerPage
            );
            const url = '/forums/thread/' + threadId + '/' +
                totalPages + '/#' + createdPost.id;

            return res.redirect(url);
        },

        async createNewThread(req, res, next) {
            const validate = require('../../validator').init(config.forums);
            const title = req.body.title;
            const content = req.body.content;
            const reqForum = req.params.forum;

            try {
                await validate.thread(title, content);
            } catch (error) {
                res.send(error);
            }

            const dbForum =
                await data.forums.getByCriteria('internalName', reqForum);

            if (dbForum[0].admin === true &&
                req.user.role !== 'admin') {
                return res.redirect('/');
            }

            if (dbForum.length <= 0) {
                return res.render('error', {
                    title: 'Error 404',
                    message: 'Forum not found',
                    error: {
                        status: 404,
                    },
                });
            }

            const dbThread = await data.threads.create({
                title: title,
                content: content,
                authorName: req.user.username,
                author: data.generateObjectId(req.user._id),
                posts: [],
                forum: dbForum[0]._id,
                dateCreated: new Date(),
                dateUpdated: new Date(),
            });

            await createNewPostInDb(data, req.user, content, dbThread, true);
            await data.forums.addThread(dbForum[0]._id, dbThread._id);
            await data.users.addThread(req.user._id, dbThread._id);

            const url = '/forums/thread/' + dbThread.id;
            app.io.emit('new-thread', {
                user: req.user.username,
                forum: dbForum[0].name,
                url: url,
            });

            return res.redirect(url);
        },
    };

    return controller;
};

async function createNewPostInDb(data, author, content, thread, isOriginal) {
    let createdPost = {
        thread: thread._id,
        content: content,
        dateCreated: new Date(),
        dateUpdated: new Date(),
        author: author._id,
    };

    if (isOriginal) {
        createdPost.original = true;
    }

    createdPost = await data.posts.create(createdPost);

    await data.threads.addPost(thread._id, createdPost.id);
    await data.users.addPost(author._id, createdPost.id);

    return createdPost;
}
module.exports = {
    init,
};
