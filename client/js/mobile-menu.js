/* globals $ */

let forumStructureIsLoaded = false;
const mobileMenu = '.mobile-menu-container';
const mobileMenuToggleButton = '.mobile-menu-toggle-btn';
const mobileMenuToggleButtonSpan = mobileMenuToggleButton + ' span';
const hideEverything = '.mobile-menu-hide-everything-im-not-creative';
const forumStructureContainer = '#mobile-submenu-forum';
let mobileMenuOpen = false;

$(document).ready(function() {
    $(hideEverything).click(() => {
        closeMobileMenu();
    });

    $(mobileMenuToggleButton).click(() => {
        if (mobileMenuOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });
});

function openMobileMenu() {
    if (!forumStructureIsLoaded) {
        loadForumStructure();
    }
    mobileMenuOpen = true;
    $(mobileMenuToggleButtonSpan).removeClass('glyphicon-menu-hamburger');
    $(mobileMenuToggleButtonSpan).addClass('glyphicon-remove');
    $(mobileMenu).show();
    $(hideEverything).stop().fadeIn();
    $(mobileMenu).stop().animate({
        width: '250px',
    });
    $('body').css({
        overflow: 'hidden',
    });
}

function closeMobileMenu() {
    mobileMenuOpen = false;
    $(mobileMenuToggleButtonSpan).removeClass('glyphicon-remove');
    $(mobileMenuToggleButtonSpan).addClass('glyphicon-menu-hamburger');
    $(mobileMenu).stop().animate({
        width: '0px',
    }, () => {
        $(mobileMenu).hide();
    });
    $(hideEverything).stop().fadeOut();
    $('body').css({
        overflow: 'auto',
    });
}

function loadForumStructure() {
    const host = window.location.hostname;
    const protocol = location.protocol;
    const url = protocol + '//' + host +
        (location.port ? ':' + location.port : '') +
        '/helpers/forums-structure';

    $.ajax({
        url: url,
        type: 'GET',
        tryCount: 0,
        retryLimit: 3,
        timeout: 5000,
        async: true,
        success: (data) => {
            forumStructureIsLoaded = true;
            $(forumStructureContainer).html(data);
        },
        error: (xhr, status, error) => {
            this.tryCount++;
            if (status === 'timeout') {
                if (this.tryCount <= this.retryLimit) {
                    $.ajax(this);
                }
            }

            $(forumStructureContainer).html('Can\'t load the menu');
            return;
        },
    });
}
