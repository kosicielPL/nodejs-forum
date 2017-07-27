/* globals $, socket */

const onlineCounter = '#online-counter';

$(document).ready(() => {
    socket.emit('request-users-online', (data) => {
        updateOnlineCounter(data);
    });
});

socket.on('users-online', (count) => {
    updateOnlineCounter(count);
});

function updateOnlineCounter(count) {
    let message;

    if (count === 1) {
        message = count + ' person is online';
    } else {
        message = count + ' people online';
    }

    if ($(onlineCounter).length > 0) {
        $(onlineCounter).html(message);
    }
}
