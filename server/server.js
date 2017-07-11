/* globals process */

const http = require('http');

const config = require('./config');
const port = normalizePort(process.env.PORT || config.server.port);

Promise.resolve()
    .then(() => require('../data/database.js'))
    // .then(() => require('./socketio').init())
    .then((data) => require('./app').init(data))
    .then((app) => {
        app.set('port', port);
        const server = http.createServer(app);
        // app.io.attach(server);
        server.listen(port, () => {
            console.log('Listening on port: ' + port);
        });
    });

// const debug = require('debug')('nodejs-forum:server');
// const http = require('http');
// const port = normalizePort(process.env.PORT || '3000');
// const app = require('../server/setupExpress');

// app.set('port', port);

// const server = http.createServer(app);
// const io = require('../server/setupSocketio');
// io.create(server);
// io.setup();
// server.listen(port);
// server.on('error', onError);
// server.on('listening', onListening);

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

// function onError(error) {
//     if (error.syscall !== 'listen') {
//         throw error;
//     }

//     const bind = typeof port === 'string' ?
//         'Pipe ' + port :
//         'Port ' + port;

//     switch (error.code) {
//         case 'EACCES':
//             console.error(bind + ' requires elevated privileges');
//             process.exit(1);
//             break;
//         case 'EADDRINUSE':
//             console.error(bind + ' is already in use');
//             process.exit(1);
//             break;
//         default:
//             throw error;
//     }
// }

// function onListening() {
//     const addr = server.address();
//     const bind = typeof addr === 'string' ?
//         'pipe ' + addr :
//         'port ' + addr.port;
//     console.log('Listening on ' + bind);
// }

// module.exports = server;
