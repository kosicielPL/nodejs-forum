const express = require('express');

module.exports = (app, data, config) => {
    const router = new express.Router();
    const controller = require('./controller').init(app, data, config);

    // all forums
    router.get('/', (req, res, next) => {
        if (!req.user) {
            return Promise.resolve()
                .then(() => {
                    return res.redirect('/login');
                });
        }
        return controller.generateAllForumsView(req, res, next);
    });

    router.get('/post/:postId', (req, res, next) => {
        return controller.getPost(req, res, next);
    });

    router.put('/post/:postId', (req, res, next) => {
        return controller.updatePost(req, res, next);
    });

    // get page for new thread in forum
    router.get('/:forum/new-thread', (req, res, next) => {
        if (!req.user) {
            return Promise.resolve()
                .then(() => {
                    return res.redirect('/login');
                });
        }
        return controller.generateNewThreadView(req, res, next);
    });

    // post new thread in forum
    router.post('/:forum/new-thread', (req, res, next) => {
        if (!req.user) {
            return Promise.resolve()
                .then(() => {
                    return res.redirect('/login');
                });
        }
        return controller.createNewThread(req, res, next);
    });

    // post new post in thread lol
    router.post('/thread/:thread/', (req, res, next) => {
        if (!req.user) {
            return Promise.resolve()
                .then(() => {
                    return res.redirect('/login');
                });
        }
        return controller.createNewPost(req, res, next);
    });

    // view thread
    router.get('/thread/:thread/:page?', (req, res, next) => {
        return controller.generateSingleThreadView(req, res, next);
    });

    // single forum
    router.get('/:forum/:page?', (req, res, next) => {
        return controller.generateSingleForumView(req, res, next);
    });

    return router;
};
