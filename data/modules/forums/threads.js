const ObjectId = require('mongodb').ObjectID;

module.exports = (url, database) => {
    return {
        getThreadsInForum: (forumId, resultsPerPage, page) => {
            return new Promise((resolve, reject) => {
                if (page < 1) {
                    reject('Requested page is less than 1');
                }

                if (resultsPerPage < 0) {
                    reject('Requested results per page are less than 0');
                }

                database.connect(url, (err, db) => {
                    db.collection('threads')
                        .aggregate([{
                                '$match': {
                                    forum: new ObjectId(forumId),
                                },
                            },
                            {
                                '$sort': {
                                    dateUpdated: -1,
                                    dateCreated: 1,
                                },
                            },
                            {
                                '$skip': (page - 1) * resultsPerPage,
                            },
                            {
                                '$limit': resultsPerPage,
                            },
                        ], (error, result) => {
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

        getThreadsInForumCount: (forumId) => {
            return new Promise((resolve, reject) => {
                database.connect(url, (err, db) => {
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


        postNewThread: (forumId, threadTitle, threadContent) => {
            return new Promise((resolve, reject) => {
                database.connect(url, (err, db) => {
                    db.collection('threads')
                        .insert({
                            'forum': new ObjectId(forumId),
                            'title': threadTitle,
                            'content': threadContent,
                            'dateCreated': new Date(),
                            'dateUpdated': new Date(),
                        }, (threadError, thread) => {
                            const threadId = thread.insertedIds[0].toString();
                            if (threadError) {
                                reject(threadError);
                            }
                            db.close();
                            resolve(threadId);
                        });
                });
            });
        },
    };
};
