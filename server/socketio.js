module.exports = (server) => {
    const io = require('socket.io')(server);

    io.on('connection', function(socket) {
        io.emit('test', {
            msg: 'User has connected!',
        });
        console.log('a user connected');
        socket.on('disconnect', function() {
            io.emit('test', {
                msg: 'User has disconnected!',
            });
            console.log('user disconnected');
        });
    });

    return io;
};
