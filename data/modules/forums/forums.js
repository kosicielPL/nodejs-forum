const ObjectId = require('mongodb').ObjectID;

module.exports = (url, database) => {
    return {
        getForums: () => {
            return new Promise((resolve, reject) => {
                database.connect(url, (err, db) => {
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
                });
            });
        },

        getForum: (forumInternalName) => {
            return new Promise((resolve, reject) => {
                database.connect(url, (err, db) => {
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

        getForumStructure: () => {
            return new Promise((resolve, reject) => {
                database.connect(url, (err, db) => {
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
                            {
                                '$project': {
                                    _id: 0,
                                    'name': 1,
                                    'forums.name': 1,
                                    'forums.internalName': 1,
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
                });
            });
        },
    };
};
