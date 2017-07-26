const database = {
    host: 'localhost',
    port: 27017,
    dbName: 'forum2',
    username: 'kostek',
    password: '1234',
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
        thread: {
            titleMinimumLength: 5,
            titleMaximumLength: 80,
        },
        post: {
            minimumLength: 5,
            maximumLength: 5000,
        },
    },
};

module.exports = {
    database,
    server,
    options,
};
