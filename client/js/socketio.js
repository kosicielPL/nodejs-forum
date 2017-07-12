/* globals toastr, io, $ */

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
    toastr.info(string, 'New thread');
});
