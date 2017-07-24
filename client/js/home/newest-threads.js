/* globals socket, $ */

$(document).ready(function() {
    const newestThreadsContainer = '.sidenav';
    let speed = 0;

    socket.on('new-thread', (msg) => {
        loadForumStructure();
    });

    loadForumStructure();

    function loadForumStructure() {
        const host = window.location.hostname;
        const protocol = location.protocol;
        const url = protocol + '//' + host +
            (location.port ? ':' + location.port : '') +
            '/helpers/newest-threads';

        $.ajax({
            url: url,
            type: 'GET',
            tryCount: 0,
            retryLimit: 3,
            timeout: 5000,
            async: true,
            success: (data) => {
                $(newestThreadsContainer).stop().fadeOut(speed, function() {
                    $(newestThreadsContainer).html(data);
                    $(newestThreadsContainer).stop().fadeIn(speed);
                });
                speed = 400;
            },
            error: (xhr, status, error) => {
                this.tryCount++;
                if (status === 'timeout') {
                    if (this.tryCount <= this.retryLimit) {
                        $.ajax(this);
                    }
                }

                $(newestThreadsContainer)
                    .html('Can\'t load the newest threads');
                return;
            },
        });
    }
});
