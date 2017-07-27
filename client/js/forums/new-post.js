/* globals $ */

const content = '#new-post-content';

$(document).ready(() => {
    if ($(content).length <= 0) {
        return;
    }

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
