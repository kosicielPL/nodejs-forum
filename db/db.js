const {
    MongoClient,
} = require('mongodb');

const init = (config) => {
    const host = config.host;
    const port = config.port;
    const dbName = config.dbName;
    const username = config.username;
    const password = config.password;

    let connectionString = 'mongodb://';

    if (password.length > 0 && username.length > 0) {
        connectionString += username + ':' + password + '@';
    }

    connectionString += host + ':' + port + '/' + dbName;

    return MongoClient.connect(connectionString);
};

module.exports = {
    init,
};
