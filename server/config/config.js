const database = {
    host: 'localhost',
    port: 27017,
    dbName: 'forum_test',
    username: '',
    password: '',
};

const server = {
    port: 3000,
};

const options = {
    home: {
        adminThreadsToDisplay: 5,
        newThreadsToDisplay: 10,
    },
    forums: {
        forumView: {
            threadsPerPage: 10,
        },
        threadView: {
            postsPerPage: 10,
        },
    },
};

module.exports = {
    database,
    server,
    options,
};
