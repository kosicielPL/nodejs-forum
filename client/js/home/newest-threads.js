/* globals socket, $ */

$(document).ready(function() {
    const newestThreadsContainer = '.sidenav';

    socket.on('new-thread', (msg) => {
        loadForumStructure();
    });

    loadForumStructure();

    function loadForumStructure() {
        const host = window.location.hostname;
        const protocol = location.protocol;
        const url = protocol + '//' + host + '/helpers/newest-threads';

        $.ajax({
            url: url,
            type: 'GET',
            tryCount: 0,
            retryLimit: 3,
            timeout: 5000,
            async: true,
            success: (data) => {
                $(newestThreadsContainer).stop().fadeOut(400, function() {
                    $(newestThreadsContainer).html(data);
                    $(newestThreadsContainer).stop().fadeIn(400);
                });
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
