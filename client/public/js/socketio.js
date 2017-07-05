const socket = io();

socket.on('test', (msg) => {
    $.notify('Test: ' + msg.msg);
});
