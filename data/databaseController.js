const assert = require('assert');
const database = require('mongodb').MongoClient;
const config = require('../config.js').database;
const url = 'mongodb://' + config.username + ':' + config.password + '@'+config.host+':'+config.port+'/'+config.dbName;

module.exports = {
    mongoConnectExample: function(callback) {
        database.connect(url, function(err, db) {
            let test;
            if (err) {
                test = err.message;
            } else {
                test = 'Database connect successful!';
            }

            callback(test);
        });
    },
};
