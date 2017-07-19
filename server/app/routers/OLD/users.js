const express = require('express');
const router = express.Router();
const db = require('../../data/database.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('test');
});

router.get('/profile/:user', function(req, res, next) {
    const user = req.params.user;
    res.render('user/profile', {
        title: user + '\'s profile',
        user: user,
    });
});

router.get('/signup', function(req, res, next) {
    const user = req.params.user;
    res.render('user/signup', {
        title: 'Sign up',
    });
});

router.get('/login', function(req, res, next) {
    const user = req.params.user;
    res.render('user/login', {
        title: 'Log in',
    });
});

module.exports = router;
