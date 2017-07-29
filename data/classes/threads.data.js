const BaseData = require('../base/base.data');
const Thread = require('../../models/thread.model');
const ObjectId = require('mongodb').ObjectID;

class ThreadsData extends BaseData {
    constructor(db) {
        super(db, Thread, Thread);
    }

    findByTitle(title) {
        const result = this.collection
            .find({
                title: {
                    $regex: '(?i).*' + title + '.*',
                },
            })
            .sort({
                dateUpdated: -1,
                dateCreated: 1,
            })
            .toArray();
        return result;
    }

    getInForum(forumId, resultsPerPage, page) {
        if (page < 1) {
            page = 1;
        }

        if (resultsPerPage < 0) {
            resultsPerPage = 0;
        }

        let result = this.collection
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
            ])
            .toArray();

        if (this.ModelClass.toViewModel) {
            result = result.then((models) => {
                return models
                    .map((model) =>
                        this.ModelClass.toViewModel(model));
            });
        }

        return result;
    }

    getNewestN(count) {
        if (count < 1) {
            count = 1;
        }

        let result = this.collection
            .aggregate([{
                '$sort': {
                    dateCreated: -1,
                },
            },
            {
                '$limit': count,
            },
            {
                '$lookup': {
                    from: 'forums',
                    localField: 'forum',
                    foreignField: '_id',
                    as: 'forum',
                },
            },
            {
                '$lookup': {
                    from: 'users',
                    localField: 'author',
                    foreignField: '_id',
                    as: 'author',
                },
            },
            {
                '$unwind': '$author',
            },
            ])
            .toArray();

        if (this.ModelClass.toViewModel) {
            result = result.then((models) => {
                return models
                    .map((model) =>
                        this.ModelClass.toViewModel(model));
            });
        }

        return result;
    }

    addPost(threadId, postId) {
        const result = this.collection
            .updateOne({
                _id: new ObjectId(threadId),
            }, {
                '$push': {
                    posts: new ObjectId(postId),
                },
                '$set': {
                    dateUpdated: new Date(),
                },
            });

        return result;
    }

    _isModelValid(model) {
        // custom validation 
        return super._isModelValid(model);
    }
}

module.exports = ThreadsData;
