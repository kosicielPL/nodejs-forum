const init = (server) => {
    const io = require('socket.io')(server);
    io.clients = [];

    // io.on('connection', (socket) => {
    //     const address = socket.request.connection.remoteAddress;

    //     io.clients.push(address);

    //     socket.broadcast.to('online people').emit('test', {
    //         msg: address + ' has connected!',
    //     });
    //     socket.join('online people');
    //     console.log('A user connected - socket id: ' + socket.id);

    //     socket.on('disconnect', function() {
    //         const index = io.clients.indexOf(address);

    //         if (index !== -1) {
    //             io.clients.splice(index, 1);
    //             console.info('Client gone (id=' + socket.id + ').');
    //         }

    //         socket.broadcast.to('online people').emit('test', {
    //             msg: address + ' has disconnected!',
    //         });
    //         console.log('A user disconnected - socket id: ' + socket.id);
    //     });
    // });

    return Promise.resolve(io);
};

module.exports = {
    init,
};
