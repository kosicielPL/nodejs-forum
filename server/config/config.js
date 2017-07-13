const database = {
    host: '95.87.202.12',
    port: 27017,
    dbName: 'forum',
    username: 'forum_user',
    password: '123456',
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
