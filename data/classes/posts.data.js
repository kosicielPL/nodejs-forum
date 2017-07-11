const BaseData = require('../base/base.data');
const Post = require('../../models/post.model');
const ObjectId = require('mongodb').ObjectID;

class PostsData extends BaseData {
    constructor(db) {
        super(db, Post, Post);
    }

    getInThread(threadId, page, resultsPerPage) {
        if (page < 1) {
            page = 1;
        }

        if (resultsPerPage < 0) {
            resultsPerPage = 0;
        }

        let result = this.collection
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

    getCountInThread(threadId) {
        const result = this.collection
            .find({
                thread: new ObjectId(threadId),
            })
            .count();

        return result;
    }

    _isModelValid(model) {
        // custom validation 
        return super._isModelValid(model);
    }
}

module.exports = PostsData;
