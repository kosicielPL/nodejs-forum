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

    getById(id) {
        const result = this.collection
            .findOne({
                _id: new ObjectId(id),
            });

        return result;
    }

    filterBy(props) {
        return this.collection.find(props)
            .toArray();
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
            return Promise.reject('Invalid data model!');
        }

        return this.collection.insert(model)
            .then(() => {
                return this.ModelClass.toViewModel(model);
            });
    }

    updateById(id, model) {
        return this.collection.updateOne(
            { _id: id },
            { $set: model }
        );
    }



    _isModelValid(model) {
        return this.validator.isValid(model);
    }

    // FIX ME: IM UGLY
    _getCollectionName() {
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
