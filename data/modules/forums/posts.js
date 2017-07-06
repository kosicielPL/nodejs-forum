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

        getPostsInThread: (threadId) => {
            return new Promise((resolve, reject) => {
                database.connect(url, (err, db) => {
                    db.collection('posts')
                        .find({
                            thread: new ObjectId(threadId),
                        })
                        .toArray((error, posts) => {
                            if (error) {
                                reject(error);
                            }
                            db.close();
                            resolve(posts);
                        });
                });
            });
        },
    };
};
