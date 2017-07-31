/* globals $, resizeTextarea, config, toastr */

const buttonEl = '.edit-btn';
const postContainerEl = '.post-container';
const editContainerEl = '.post-right-part';

function addEditClick() {
    $(buttonEl).off();
    $(buttonEl).on('click', startEdit);
}

$(document).ready(() => {
    addEditClick();
});

function startEdit() {
    stopEdit();
    const targetPost = $(this).closest(postContainerEl);
    const targetPostId = $(targetPost).attr('id');
    const editContainer = '#' + targetPostId + ' ' + editContainerEl;
    let sumbitClicked = false;

    scrollTo(editContainer);
    getPostContent(targetPostId)
        .catch((error) => {
            toastr.error(error, 'ERROR');
            stopEdit();
        })
        .then((content) => {
            $(editContainer).children().hide();
            const editHtml = $('<div class="row edit-content"/>');
            editHtml.load('/js/forums/edit-post.html', () => {
                const textarea = editHtml.find('textarea');
                $(editContainer).append(editHtml);

                textarea.text(content);
                textarea.height(textarea[0].scrollHeight);
                editHtml.find('form').validator();
                editHtml.find('form').validator('validate');
                textarea.attr({
                    'data-minlength': config.minLength,
                    'data-minlength-error': 'Content must be atleast ' +
                        config.minLength +
                        ' symbols',
                    'maxlength': config.maxLength,
                });

                textarea.focus();
                textarea.on('input', resizeTextarea);

                editHtml.find('.edit-cancel').click(stopEdit);
                editHtml.find('.edit-submit').click((e) => {
                    e.preventDefault();
                    if ($(this).hasClass('disabled') || sumbitClicked) {
                        toastr.error('DONT\'T SPAM, FUCKER', 'ERROR');
                        toastr.error('DONT\'T SPAM, FUCKER', 'ERROR');
                        toastr.error('DONT\'T SPAM, FUCKER', 'ERROR');
                        return;
                    }
                    sumbitClicked = true;
                    const newContent = textarea.val();
                    sendEditedPost(targetPostId, newContent)
                        .catch((error) => {
                            toastr.error(error, 'ERROR');
                            stopEdit();
                        })
                        .then(() => {
                            loadEditedPost(targetPostId)
                                .catch((error) => {
                                    toastr.error(error, 'ERROR');
                                    stopEdit();
                                })
                                .then((html) => {
                                    stopEdit();
                                    const currentPostContainer = $('#' + targetPostId);
                                    const udaptedPost = $(html).find('#' + targetPostId).children();

                                    currentPostContainer.html(udaptedPost);
                                    addEditClick();
                                });
                        });
                });
            });
        });
}

function stopEdit() {
    $('.edit-content').find('form').validator('destroy');
    $('.edit-content').remove();
    $(editContainerEl).children().show();
}

function getPostContent(postId) {
    const url = '/forums/post/' + postId;

    return new Promise((resolve, reject) => {
        $.ajax({
            url: url,
            type: 'GET',
            tryCount: 0,
            retryLimit: 3,
            timeout: 5000,
            async: true,
            success: (data) => {
                resolve(data.content);
            },
            error: (xhr, status, error) => {
                this.tryCount++;
                if (status === 'timeout') {
                    if (this.tryCount <= this.retryLimit) {
                        $.ajax(this);
                    }
                }
                reject(error);
            },
        });
    });
}

function sendEditedPost(postId, content) {
    const url = '/forums/post/' + postId;

    return new Promise((resolve, reject) => {
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
                resolve();
            },
            error: (xhr, status, error) => {
                this.tryCount++;
                if (status === 'timeout') {
                    if (this.tryCount <= this.retryLimit) {
                        $.ajax(this);
                    }
                }

                reject(error);
            },
        });
    });
}

function loadEditedPost(postId) {
    const url = window.location.href;

    return new Promise((resolve, reject) => {
        $.ajax({
            url: url,
            type: 'GET',
            tryCount: 0,
            retryLimit: 3,
            timeout: 5000,
            async: true,
            success: (data) => {
                resolve(data);
            },
            error: (xhr, status, error) => {
                this.tryCount++;
                if (status === 'timeout') {
                    if (this.tryCount <= this.retryLimit) {
                        $.ajax(this);
                    }
                }

                reject(error);
            },
        });
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
