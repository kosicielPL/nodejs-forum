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
    users: {
        username: {
            minLength: 4,
            maxLength: 20,
            regex: '^[0-9a-zA-Z]*$',
            regexError: 'Username may contain only letters and digits',
        },
        email: {
            regex: [
                '[a-z0-9!#$%&\'*+/=?^_\`{|}~-]+(?:\.[a-z0-9!#$%&\'*',
                '+/=?^_\`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9',
                '])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?',
            ].join(''),
        },
        password: {
            minLength: 6,
            maxLength: 40,
        },
        firstName: {
            minLength: 2,
            maxLength: 20,
        },
        lastName: {
            minLength: 2,
            maxLength: 20,
        },
    },
    forums: {
        forumView: {
            threadsPerPage: 10,
        },
        threadView: {
            postsPerPage: 10,
        },
        thread: {
            titleMinLength: 5,
            titleMaxLength: 80,
        },
        post: {
            minLength: 5,
            maxLength: 5000,
        },
    },
};

module.exports = {
    database,
    server,
    options,
};
