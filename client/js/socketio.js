/* globals toastr, io, $ */

const socket = io();

socket.on('new-thread', (msg) => {
    const string = msg.user + ' has started a new thread in ' + msg.forum;
    toastr.info(string, 'New thread');
});

socket.on('new-post', (msg) => {
    const string = msg.user + ' has posted in ' + msg.thread;
    toastr.info(string, 'New post');
});
