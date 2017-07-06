const express = require('express');
const router = express.Router();
const db = require('../../data/database.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('settings', {
        title: 'Settings',
    });
});

module.exports = router;
