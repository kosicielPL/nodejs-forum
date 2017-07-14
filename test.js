const config = require('./server/config');
const ObjectId = require('mongodb').ObjectID;

require('./db').init(config.database)
    .then((db) => {
        const threads = db.collection('threads');
        const posts = db.collection('posts');

        posts
            .find()
            .forEach((post) => {
                threads
                    .find({
                        _id: new ObjectId(post.thread),
                    })
                    .toArray()
                    .then((result) => {
                        const thread = result[0];
                        threads.updateOne({
                            _id: post.thread,
                        }, {
                            '$push': {
                                posts: post._id,
                            },
                        }, {
                            upsert: true,
                        });
                    });
            });

        return;
    });
