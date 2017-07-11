const express = require('express');
const router = express.Router();
const db = require('../../data/database.js');

router.get('/forumstructure', function(req, res, next) {
    db.forums.getStructure()
        .then((result) => {
            res.render('mobileMenuStructure', {
                structure: result,
            });
        });
});

module.exports = router;
