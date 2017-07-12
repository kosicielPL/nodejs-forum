const BaseData = require('../base/base.data');
const Forum = require('../../models/forum.model');

class ForumsData extends BaseData {
    constructor(db) {
        super(db, Forum, Forum);
    }

    getAdminContent(count) {
        if (count < 1 && count === 'undefined') {
            count = 1;
        }

        let result = this.collection
            .aggregate([{
                    '$match': {
                        admin: true,
                    },
                },
                {
                    '$lookup': {
                        from: 'threads',
                        localField: '_id',
                        foreignField: 'forum',
                        as: 'thread',
                    },
                },
                {
                    '$sort': {
                        dateCreated: -1,
                    },
                },
                {
                    '$unwind': '$thread',
                },
                {
                    '$sort': {
                        'thread.dateCreated': -1,
                    },
                },
                {
                    '$limit': count,
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

    _isModelValid(model) {
        // custom validation 
        return super._isModelValid(model);
    }
}

module.exports = ForumsData;
