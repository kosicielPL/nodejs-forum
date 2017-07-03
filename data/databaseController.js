const assert = require('assert');
const database = require('mongodb').MongoClient;
const config = require('../config.js').database;
const url = 'mongodb://' + config.username + ':' + config.password + '@' + config.host + ':' + config.port + '/' + config.dbName;

module.exports = {
    mongoConnectExample: (callback) => {
        database.connect(url, (err, db) => {
            let test;
            if (err) {
                test = err.message;
            } else {
                test = 'Database connect successful!';
            }
            db.close();
            callback(test);
        });
    },

    getForums: () => {
        return new Promise((resolve, reject) => {
            database.connect(url, (err, db) => {
                assert.equal(null, err);
                // db.collection('forums')
                //     .find()
                //     .toArray(function(error, items) {
                //         resolve(items);
                //     });
                db.collection('categories')
                    .aggregate([{
                            '$sort': {
                                'priority': 1,
                                'forums.priority': 1,
                            },
                        },
                        {
                            '$lookup': {
                                from: 'forums',
                                localField: '_id',
                                foreignField: 'category',
                                as: 'forums',
                            },
                        },
                    ])
                    .toArray(function(error, result) {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(JSON.stringify(result));
                        }
                    });
                // db.close();
            });
        });
    },
};
