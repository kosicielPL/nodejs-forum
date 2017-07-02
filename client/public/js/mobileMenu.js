const mobileMenu = '.mobile-menu-container';
const mobileMenuOpenButton = '.mobile-menu-open-btn';
const mobileMenuCloseButton = '.mobile-menu-close-btn';
const mobileMenuToggleButton = '.mobile-menu-toggle-btn';
const mobileMenuToggleButtonSpan = mobileMenuToggleButton + ' span';
const hideEverything = '.mobile-menu-hide-everything-im-not-creative';

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
