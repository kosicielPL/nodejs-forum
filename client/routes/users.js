const express = require('express');
const router = express.Router();
const db = require('../../data/databaseController.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(db.test());
});

module.exports = router;
