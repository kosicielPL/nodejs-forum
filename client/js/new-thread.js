const title = '#new-thread-name';
const content = '#new-thread-content';
const button = '#new-thread-button';
const titleMinLengthContainer = '#title-min-length';
const contentMinLengthContainer = '#content-min-length';
const titleMinLength = 3;
const contentMinLength = 5;

$(document).ready(() => {
    $(title).focus();
    $(titleMinLengthContainer).text(titleMinLength);
    $(contentMinLengthContainer).text(contentMinLength);

    $(title).on('input', () => {
        trackText();
    });

    $(content).on('input', () => {
        trackText();
    });

    function trackText() {
        if ($(title).val().length >= titleMinLength &&
            $(content).val().length >= contentMinLength) {
            $(button).prop('disabled', false);
        } else {
            $(button).prop('disabled', true);
        }
    }
});
