const assert = require('assert');
const database = require('mongodb').MongoClient;
const url = 'mongodb://forum_user:123456@95.87.202.12:27017/forum';

module.exports = {
    mongoConnectExample: function() {
        database.connect(url, function(err, db) {
            assert.equal(null, err);
            console.log('Connected successfully to server');

            db.close();
        });
    },

    test: function() {
        return 'afaf';
    },
};
