const database = {
    host: '95.87.202.12',
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
