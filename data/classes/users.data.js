const BaseData = require('../base/base.data');
const User = require('../../models/user.model');

class UsersData extends BaseData {
    constructor(db) {
        super(db, User, User);
    }

    checkUsername(username) {
        const result = this.collection
            .find({
                username: {
                    '$regex': '^' + username + '$',
                    '$options': 'i',
                }
            })
            .count();

        return result;
    }

    _isModelValid(model) {
        // custom validation 
        return super._isModelValid(model);
    }
}

module.exports = UsersData;
