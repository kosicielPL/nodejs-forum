const BaseData = require('../base/base.data');
const Category = require('../../models/category.model');

class CategoriesData extends BaseData {
    constructor(db) {
        super(db, Category, Category);
    }

    getAllForumsInCategories() {
        let result = this.collection
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

    getStructure() {
        const result = this.collection
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
            .toArray();

        return result;
    }

    _isModelValid(model) {
        // custom validation 
        return super._isModelValid(model);
    }
}

module.exports = CategoriesData;
