const socket = io();

socket.on('test', (msg) => {
    $.notify(msg.msg, {
        className: 'info',
        position: 'bottom right',
    });
});
