// Retrieve
const MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect('mongodb://forum_user:123456@95.87.202.12:27017/forum', function(err, db) {
    if (!err) {
        console.log('We are connected');
    } else {
        console.log(err.message);
    }
});
