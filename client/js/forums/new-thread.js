/* globals $ */

const content = '#new-thread-content';

$(document).ready(() => {
    resizeTextarea();

    $(content).on('input', () => {
        resizeTextarea();
    });

    function resizeTextarea() {
        $(content)
            .height(1)
            .height($(content)[0].scrollHeight);
    }
});
