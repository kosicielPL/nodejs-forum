const BaseData = require('../base/base.data');
const User = require('../../models/user.model');
const ObjectId = require('mongodb').ObjectID;

class UsersData extends BaseData {
    constructor(db) {
        super(db, User, User);
    }

    getAllUsersLength(username) {
        if (!username) {
            username = '';
        }

        const result = this.collection
            .aggregate([{
                '$match': {
                    username: { $regex: '(?i).*' + username + '.*' },
                },
            },
            ])
            .toArray();
        return result;
    }

    getAllUsers(username, resultsPerPage, page) {
        if (page < 1) {
            page = 1;
        }

        if (resultsPerPage < 0) {
            resultsPerPage = 0;
        }

        if (!username) {
            username = '';
        }

        const result = this.collection
            .aggregate([{
                '$match': {
                    username: { $regex: '(?i).*' + username + '.*' },
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
        return result;
    }

    findByUsername(username) {
        const regex = '^' + username + '$'; // exact match

        return this
            .filterBy({
                username: new RegExp(regex, 'i'),
            })
            .then(([user]) => user);
    }

    findByEmail(email) {
        const regex = '^' + email + '$'; // exact match

        return this
            .filterBy({
                email: new RegExp(regex, 'i'),
            })
            .then(([user]) => user);
    }

    addPost(userId, postId) {
        const result = this.collection
            .updateOne({
                _id: new ObjectId(userId),
            }, {
                '$push': {
                    posts: new ObjectId(postId),
                },
            });

        return result;
    }

    addThread(userId, threadId) {
        const result = this.collection
            .updateOne({
                _id: new ObjectId(userId),
            }, {
                '$push': {
                    threads: new ObjectId(threadId),
                },
            });

        return result;
    }

    _isModelValid(model) {
        // custom validation 
        return super._isModelValid(model);
    }
}

module.exports = UsersData;
