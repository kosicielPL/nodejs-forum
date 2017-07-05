module.exports = (server) => {
    const io = require('socket.io')(server);

    io.on('connection', function(socket) {
        io.emit('test', {
            msg: 'A user has connected!',
        });
        console.log('a user connected');
        socket.on('disconnect', function() {
            io.emit('test', {
                msg: 'A user has disconnected!',
            });
            console.log('user disconnected');
        });
    });

    return io;
};
