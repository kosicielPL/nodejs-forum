const BaseData = require('../base/base.data');
const Forum = require('../../models/forum.model');

class ForumsData extends BaseData {
    constructor(db) {
        super(db, Forum, Forum);
    }

    _isModelValid(model) {
        // custom validation 
        return super._isModelValid(model);
    }
}

module.exports = ForumsData;
