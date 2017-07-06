const express = require('express');
const router = express.Router();
const db = require('../../data/databaseController.js');

router.get('/forumstructure', function(req, res, next) {
    db.getForumStructure()
        .then((result) => {
            res.render('mobileMenuStructure', {
                structure: result,
            });
        });
});

module.exports = router;
