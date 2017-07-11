const {
    MongoClient,
} = require('mongodb');

const init = (config) => {
    const host = config.database.host;
    const port = config.database.port;
    const dbName = config.database.dbName;
    const username = config.database.username;
    const password = config.database.password;

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
