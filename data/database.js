const assert = require('assert');
const database = require('mongodb').MongoClient;
const config = require('../config.js').database;
const url = 'mongodb://' + config.username + ':' + config.password + '@' + config.host + ':' + config.port + '/' + config.dbName;

const forums = require('../data/modules/forums/forums')(url, database);
const threads = require('../data/modules/forums/threads')(url, database);
const posts = require('../data/modules/forums/posts')(url, database);

module.exports = {
    forums: {
        getAll: forums.getForums,
        getSingle: forums.getForum,
        getStructure: forums.getForumStructure,
    },
    threads: {
        getSingle: threads.getThread,
        getAllInForum: threads.getThreadsInForum,
        getAllInForumCount: threads.getThreadsInForumCount,
        createSingle: threads.postNewThread,
    },
    posts: {
        createSingle: posts.postNewPost,
        getAllInThread: posts.getPostsInThread,
    },
};
