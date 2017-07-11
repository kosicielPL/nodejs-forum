const ObjectId = require('mongodb').ObjectID;

class BaseData {
    constructor(db, ModelClass, validator) {
        this.db = db;
        this.ModelClass = ModelClass;
        this.validator = validator;
        this.collectionName = this._getCollectionName();
        this.collection = this.db.collection(this.collectionName);
    }

    getAll() {
        let result = this.collection
            .find()
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

    getById(id) { // FIX ME SENPAI can't figure findOne return
        let result = this.collection
            .find({
                _id: new ObjectId(id),
            })
            .toArray();

        // if (result !== null) {
        //     result = result[0];
        // }

        if (this.ModelClass.toViewModel) {
            result = result.then((models) => {
                return models
                    .map((model) =>
                        this.ModelClass.toViewModel(model));
            });
        }

        return result;
    }

    getByCriteria(field, value) {
        let result = this.collection
            .find({
                [field]: value,
            })
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

    create(model) {
        if (!this._isModelValid(model)) {
            return Promise.reject('Invalid model');
        }

        return this.collection.insert(model)
            .then(() => {
                return this.ModelClass.toViewModel(model);
            });
    }

    _isModelValid(model) {
        return this.validator.isValid(model);
    }

    _getCollectionName() { // FIX ME: IM UGLY
        let name = this.ModelClass.name.toLowerCase() + 's';
        const symbolBeforeLast = name.length - 2;

        if (name[symbolBeforeLast] === 'y') {
            name = name.substr(0, symbolBeforeLast) +
                'ie' +
                name.substr(symbolBeforeLast + 1, 2);
        }

        return name;
    }
}

module.exports = BaseData;
