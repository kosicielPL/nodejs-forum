const init = (server) => {
    const io = require('socket.io')(server);
    io.clients = [];

    io.on('connection', (socket) => {
        const cookie = socket.handshake.headers.cookie;

        if (io.clients.indexOf(cookie) === -1) {
            io.clients.push(cookie);
        }

        socket.join('online-people');

        socket.broadcast
            .to('online-people')
            .emit('users-online', io.clients.length);

        // console.log('A user connected - socket id: ' + socket.id);
        socket.on('request-users-online', (fn) => {
            fn(io.clients.length);
            socket.emit(io.clients.length);
        });

        socket.on('disconnect', () => {
            const index = io.clients.indexOf(cookie);

            if (index !== -1) {
                io.clients.splice(index, 1);
            }

            socket.leave('online people');

            socket.broadcast
                .to('online-people')
                .emit('users-online', io.clients.length);

            // console.log('A user disconnected - socket id: ' + socket.id);
        });
    });

    return Promise.resolve(io);
};

module.exports = {
    init,
};
