const socket = io();

socket.on('test', (msg) => {
    $.notify(msg.msg, {
        style: 'glass',
        className: 'error',
        position: 'bottom right',
    });
});

socket.on('newthread', (msg) => {
    const string = msg.user + ' has posted in ' + msg.forum;
    $.notify(string, {
        style: 'glass',
        className: 'info',
        position: 'bottom right',
    });
});
