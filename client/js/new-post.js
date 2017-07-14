/* globals $ */

const content = '#new-post-content';
const button = '#new-post-button';
const contentMinLengthContainer = '#content-min-length';
const contentMinLength = 5;

$(document).ready(() => {
    resizeTextarea();
    $(contentMinLengthContainer).text(contentMinLength);

    $(content).on('input', () => {
        trackText();
        resizeTextarea();
    });

    function trackText() {
        if ($(content).val().length >= contentMinLength) {
            $(button).prop('disabled', false);
        } else {
            $(button).prop('disabled', true);
        }
    }

    function resizeTextarea() {
        // alert($(content)[0].scrollHeight);
        $(content)
            .height(1)
            .height($(content)[0].scrollHeight);
    }
});
