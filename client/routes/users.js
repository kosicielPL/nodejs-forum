const express = require('express');
const router = express.Router();
const db = require('../../data/databaseController.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
    db.mongoConnectExample((test) => {
        res.send(test);
    });
});

module.exports = router;
