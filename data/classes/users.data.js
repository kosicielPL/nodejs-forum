const BaseData = require('../base/base.data');
const User = require('../../models/user.model');

class UsersData extends BaseData {
    constructor(db) {
        super(db, User, User);
    }

    _isModelValid(model) {
        // custom validation 
        return super._isModelValid(model);
    }
}

module.exports = UsersData;
