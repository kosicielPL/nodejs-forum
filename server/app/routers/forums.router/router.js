const express = require('express');

module.exports = (app, data) => {
    const router = new express.Router();
    const controller = require('./controller').init(app, data);

    // all forums
    router.get('/', (req, res) => {
        return controller.generateAllForumsView(req, res);
    });

    // get page for new thread in forum
    router.get('/:forum/new-thread', (req, res) => {
        return controller.generateNewThreadView(req, res);
    });

    // post new thread in forum
    router.post('/:forum/new-thread', (req, res) => {
        return controller.createNewThread(req, res);
    });

    // post new post in thread lol
    router.post('/:thread/new-post', (req, res) => {
        return controller.createNewPost(req, res);
    });

    // view thread
    router.get('/thread/:thread/:page?', (req, res) => {
        return controller.generateSingleThreadView(req, res);
    });

    // single forum
    router.get('/:forum/:page?', (req, res) => {
        return controller.generateSingleForumView(req, res);
    });

    return router;
};
