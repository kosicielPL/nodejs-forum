const BaseData = require('../base/base.data');
const User = require('../../models/user.model');
const ObjectId = require('mongodb').ObjectID;

class UsersData extends BaseData {
    constructor(db) {
        super(db, User, User);
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

    checkPassword(username, password) {
        return this
            .findByUsername(username)
            .then((user) => {
                if (!user) {
                    throw new Error('User \"' + username + '\" doesn\' exist!');
                }

                if (user.password !== password) {
                    throw new Error('The provided password is incorrect!');
                }

                return true;
            });
    }

    _isModelValid(model) {
        // custom validation 
        return super._isModelValid(model);
    }
}

module.exports = UsersData;
