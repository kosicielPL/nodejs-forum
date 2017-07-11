const content = '#new-post-content';
const button = '#new-post-button';
const contentMinLengthContainer = '#content-min-length';
const contentMinLength = 5;

$(document).ready(() => {
    $(contentMinLengthContainer).text(contentMinLength);

    $(content).on('input', () => {
        trackText();
    });

    function trackText() {
        if ($(content).val().length >= contentMinLength) {
            $(button).prop('disabled', false);
        } else {
            $(button).prop('disabled', true);
        }
    }
});
