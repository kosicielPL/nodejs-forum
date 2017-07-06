const ObjectId = require('mongodb').ObjectID;

module.exports = (url, database) => {
    return {
        postNewPost: (threadId, content) => {
            return new Promise((resolve, reject) => {
                database.connect(url, (err, db) => {
                    db.collection('posts')
                        .insert({
                            'thread': new ObjectId(threadId),
                            'content': content,
                            'dateCreated': new Date(),
                            'dateUpdated': new Date(),
                        }, (postError, post) => {
                            const postId = post.insertedIds[0].toString();
                            if (postError) {
                                reject(postError);
                            }
                            db.collection('threads')
                                .update({
                                    _id: new ObjectId(threadId),
                                }, {
                                    '$set': {
                                        dateUpdated: new Date(),
                                    },
                                }, {
                                    upsert: true,
                                }, (updateError, result) => {
                                    if (updateError) {
                                        reject(updateError);
                                    }
                                    db.close();
                                    resolve(postId);
                                });
                        });
                });
            });
        },

        getPostsInThread: (threadId, resultsPerPage, page) => {
            return new Promise((resolve, reject) => {
                database.connect(url, (err, db) => {
                    db.collection('posts')
                        .aggregate([{
                                '$match': {
                                    thread: new ObjectId(threadId),
                                },
                            },
                            {
                                '$sort': {
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

        getPostsInThreadCount: (threadId) => {
            return new Promise((resolve, reject) => {
                database.connect(url, (err, db) => {
                    db.collection('posts')
                        .find({
                            thread: new ObjectId(threadId),
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
    };
};
