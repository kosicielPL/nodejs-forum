const express = require('express');
const async = require('async');
const router = express.Router();
const db = require('../../data/databaseController.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    Promise.all([
        db.getForums(),
    ]).then((result) => {
        // res.send(result);
        res.render('forum/allForums', {
            title: 'Forums',
            result: result,
        });
    });

    // res.render('forum/allForums', {
    //   title: 'Forums',
    //   forums: allForums,
    // });
});

module.exports = router;
