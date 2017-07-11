const BaseData = require('../base/base.data');
const Thread = require('../../models/thread.model');
const ObjectId = require('mongodb').ObjectID;

class ThreadsData extends BaseData {
    constructor(db) {
        super(db, Thread, Thread);
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

    getCountInForum(forumId) {
        const result = this.collection
            .find({
                forum: new ObjectId(forumId),
            })
            .count();

        return result;
    }

    _isModelValid(model) {
        // custom validation 
        return super._isModelValid(model);
    }
}

module.exports = ThreadsData;
