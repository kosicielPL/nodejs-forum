const debug = require('debug')('nodejs-forum:server');
const http = require('http');
const port = normalizePort(process.env.PORT || '3000');
const app = require('../server/setupExpress');

app.set('port', port);

const server = http.createServer(app);
const io = require('../server/setupSocketio').create(server);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

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

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ?
    'Pipe ' + port :
    'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ?
    'pipe ' + addr :
    'port ' + addr.port;
  debug('Listening on ' + bind);
}

module.exports = server;
