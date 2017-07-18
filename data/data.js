const CategoriesData = require('./classes/categories.data');
const ForumsData = require('./classes/forums.data');
const ThreadsData = require('./classes/threads.data');
const PostsData = require('./classes/posts.data');
const UsersData = require('./classes/users.data');
const ObjectId = require('mongodb').ObjectID;

const init = (db) => {
    return Promise.resolve({
        categories: new CategoriesData(db),
        forums: new ForumsData(db),
        threads: new ThreadsData(db),
        posts: new PostsData(db),
        users: new UsersData(db),
        generateObjectId: (id) => {
            return new ObjectId(id);
        },
    });
};

module.exports = {
    init,
};
