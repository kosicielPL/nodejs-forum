const express = require('express');
const router = new express.Router();

module.exports = (app, data) => {
    router.get('/forumstructure', function(req, res, next) {
        data.forums.getStructure()
            .then((result) => {
                res.render('mobileMenuStructure', {
                    structure: result,
                });
            });
    });

    return router;
};
