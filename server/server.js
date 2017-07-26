/* globals process */

const config = require('./config');
const http = require('http');
const port = normalizePort(process.env.PORT || config.server.port);
const colors = require('colors');

const dbConf = config.database;
let connectionString = 'mongodb://';

if (dbConf.password.length > 0 && dbConf.username.length > 0) {
    connectionString += dbConf.username + ':' + dbConf.password + '@';
}

connectionString += dbConf.host + ':' + dbConf.port + '/' + dbConf.dbName;

console.log('Database connection: '.gray + 'mongodb://' + dbConf.host + ':'+ dbConf.port);
console.log('Selected database: '.gray + dbConf.dbName);

Promise.resolve()
    .then(() => require('../db').init(connectionString))
    .then((db) => require('../data').init(db))
    .then((data) => require('./app').init(data, config.options, connectionString))
    .then((app) => {
        app.set('port', port);
        const server = http.createServer(app);
        require('./socketio').init(server)
            .then((io) => {
                app.io = io;
            });
        // app.io.attach(server);
        server.listen(port, () => {
            const startMessage = 'Listening on port: ' + port;
            console.log(startMessage.green);
        });
    });

function normalizePort(val) {
    const portInt = parseInt(val, 10);

    if (isNaN(portInt)) {
        return val;
    }

    if (portInt >= 0) {
        return portInt;
    }

    return false;
}
