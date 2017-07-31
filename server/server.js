/* globals process */
const config = require('./config');
const http = require('http');
const port = normalizePort(config.server.port);
const colors = require('colors');

start(config);

async function start(configuration) {
    const db = await initializeDb(configuration);
    const data = await initializeData(db);
    const app = await initializeApp(data, config);

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
}

async function initializeDb(configuration) {
    let db = null;
    const dbConf = config.database;
    const connectionString = createConnectionString(dbConf);

    try {
        db = await require('../db').init(connectionString);
    } catch (error) {
        console.log('Database connection error!'.bgRed.white);
        console.log(error.message);
        process.exit(1);
    }

    console.log('Database connection: '.gray + 'mongodb://' + dbConf.host + ':' + dbConf.port);
    console.log('Selected database: '.gray + dbConf.dbName);

    return db;
}

async function initializeData(db) {
    let data = null;

    try {
        data = await require('../data').init(db);
    } catch (error) {
        console.log('Error initializing data!'.bgRed.white);
        console.log(error);
        process.exit(1);
    }

    return data;
}

async function initializeApp(data, configuration) {
    let app = null;
    const connectionString = createConnectionString(config.database);

    try {
        app =
            await require('./app')
            .init(data, config.options, connectionString);
    } catch (error) {
        console.log('Error initializing app!'.bgRed.white);
        console.log(error);
        process.exit(1);
    }

    return app;
}

function createConnectionString(databaseConfiguration) {
    let connectionString = 'mongodb://';

    if (databaseConfiguration.password.length > 0 &&
        databaseConfiguration.username.length > 0) {
        connectionString +=
            databaseConfiguration.username +
            ':' +
            databaseConfiguration.password +
            '@';
    }

    connectionString +=
        databaseConfiguration.host +
        ':' +
        databaseConfiguration.port +
        '/' +
        databaseConfiguration.dbName;

    return connectionString;
}

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
