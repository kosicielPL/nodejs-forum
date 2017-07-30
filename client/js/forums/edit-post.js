/* globals $, resizeTextarea, config */

const buttonEl = '.edit-btn';
const postContainerEl = '.post-container';
const editContainerEl = '.post-right-part';

function addEditClick() {
    $(buttonEl).click(startEdit);
}

$(document).ready(() => {
    addEditClick();
});

function startEdit() {
    stopEdit();
    const targetPost = $(this).closest(postContainerEl);
    const targetPostId = $(targetPost).attr('id');
    const editContainer = '#' + targetPostId + ' ' + editContainerEl;
    $(editContainer).children().hide();
    scrollTo(editContainer);

    const content = $(editContainer).find('.row.post-text').text();
    const editHtml = $('<div class="row edit-content"/>');

    editHtml.load('/js/forums/edit-post.html', () => {
        const textarea = editHtml.find('textarea');
        textarea.attr('data-minlength', config.minLength);
        textarea.attr(
            'data-minlength-error',
            'Content must be atleast ' + config.minLength + ' symbols'
        );
        textarea.attr('maxlength', config.maxLength);
        getEditPost(targetPostId, textarea);
        textarea.on('input', resizeTextarea);
        editHtml.find('form').validator();

        editHtml.find('.edit-cancel').click(stopEdit);
        editHtml.find('.edit-submit').click((e) => {
            e.preventDefault();
            if ($(this).hasClass('disabled')) {
                return;
            }
            const newContent = textarea.val();
            sendEditRequest(targetPostId, newContent);
        });

    });

    $(editContainer).append(editHtml);
}

function stopEdit() {
    $('.edit-content').find('form').validator('destroy');
    $('.edit-content').remove();
    $(editContainerEl).children().show();
}

function getEditPost(postId, targetContainer) {
    const url = '/forums/post/' + postId;
    $.ajax({
        url: url,
        type: 'GET',
        tryCount: 0,
        retryLimit: 3,
        timeout: 5000,
        async: true,
        success: (data) => {
            targetContainer.text(data.content);
            targetContainer.height(targetContainer[0].scrollHeight);
            targetContainer.focus();
            targetContainer.closest('form').validator('validate');
        },
        error: (xhr, status, error) => {
            this.tryCount++;
            if (status === 'timeout') {
                if (this.tryCount <= this.retryLimit) {
                    $.ajax(this);
                }
            }
            return;
        },
    });
}

function sendEditRequest(postId, content) {
    const url = '/forums/post/' + postId;
    $.ajax({
        url: url,
        type: 'PUT',
        tryCount: 0,
        retryLimit: 3,
        timeout: 5000,
        async: true,
        data: {
            content: content,
        },
        success: () => {
            changeContent(postId);
        },
        error: (xhr, status, error) => {
            this.tryCount++;
            if (status === 'timeout') {
                if (this.tryCount <= this.retryLimit) {
                    $.ajax(this);
                }
            }
            return;
        },
    });
}

function changeContent(postId) {
    const url = window.location.href;
    $.ajax({
        url: url,
        type: 'GET',
        tryCount: 0,
        retryLimit: 3,
        timeout: 5000,
        async: true,
        success: (data) => {
            const currentPostContainer = $('#' + postId);
            const udaptedPost = $(data).find('#' + postId).children();

            currentPostContainer.html(udaptedPost);
            addEditClick();
        },
        error: (xhr, status, error) => {
            this.tryCount++;
            if (status === 'timeout') {
                if (this.tryCount <= this.retryLimit) {
                    $.ajax(this);
                }
            }
            return;
        },
    });
}

function scrollTo(target) {
    const el = $(target);
    const elOffset = el.offset().top;
    const speed = 400;

    $('html, body').animate({
        scrollTop: elOffset - 20,
    }, speed);
}
