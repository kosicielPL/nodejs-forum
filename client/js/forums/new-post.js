/* globals $ */

$(document).ready(() => {
    const content = '#new-post-content';
    if ($(content).length <= 0) {
        return;
    }

    $(content)
        .height(1)
        .height($(content)[0].scrollHeight);

    $(content).on('input', resizeTextarea);
});

function resizeTextarea() {
    $(this)
        .height(1)
        .height($(this)[0].scrollHeight);
}
