const assert = require('assert');
const database = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
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
                    .toArray((error, result) => {
                        db.close();
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result);
                        }
                    });
                // db.close();
            });
        });
    },

    getForum: (forumInternalName) => {
        return new Promise((resolve, reject) => {
            database.connect(url, (err, db) => {
                assert.equal(null, err);
                db.collection('forums')
                    .findOne({
                        internalName: forumInternalName,
                    }, (error, result) => {
                        db.close();
                        if (error) {
                            reject(error);
                        } else if (result) {
                            resolve(result);
                        } else {
                            reject('Forum doesnt exist!');
                        }
                    });
            });
        });
    },

    getForumThreads: (forumId, resultsPerPage, page) => {
        return new Promise((resolve, reject) => {
            if (page < 1) {
                reject('Requested page is less than 1');
            }

            if (resultsPerPage < 0) {
                reject('Requested results per page are less than 0');
            }

            database.connect(url, (err, db) => {
                assert.equal(null, err);
                db.collection('threads')
                    .find({
                        forum: new ObjectId(forumId),
                    })
                    .skip((page - 1) * resultsPerPage)
                    .limit(resultsPerPage)
                    .toArray((error, result) => {
                        db.close();
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result);
                        }
                    });
            });
        });
    },

    getForumThreadsCount: (forumId) => {
        return new Promise((resolve, reject) => {
            database.connect(url, (err, db) => {
                assert.equal(null, err);
                db.collection('threads')
                    .find({
                        forum: new ObjectId(forumId),
                    })
                    .count()
                    .then((count, error) => {
                        db.close();
                        if (error) {
                            reject(error);
                        } else {
                            resolve(count);
                        }
                    });
            });
        });
    },

    getThread: (threadId) => {
        return new Promise((resolve, reject) => {
            database.connect(url, (err, db) => {
                assert.equal(null, err);
                db.collection('threads')
                    .aggregate([{
                            '$match': {
                                _id: new ObjectId(threadId),
                            },
                        },
                        {
                            '$lookup': {
                                from: 'forums',
                                localField: 'forum',
                                foreignField: '_id',
                                as: 'forum',
                            },
                        }, {
                            '$unwind': '$forum',
                        },
                    ], (error, result) => {
                        db.close();
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result[0]);
                        }
                    });
            });
        });
    },
};
