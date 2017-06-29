const mobileMenu = '.mobile-menu-container';
const mobileMenuOpenButton = '.mobile-menu-open-btn';
const mobileMenuCloseButton = '.mobile-menu-close-btn';
const mobileMenuToggleButton = '.mobile-menu-toggle-btn';
const mobileMenuToggleButtonSpan = mobileMenuToggleButton + ' span';

$(document).ready(function() {
    let mobileMenuOpen = false;

    $(mobileMenuToggleButton).click(() => {
        if (mobileMenuOpen) {
            mobileMenuOpen = false;
            closeMobileMenu();
        } else {
            mobileMenuOpen = true;
            openMobileMenu();
        }
    });
});

function openMobileMenu() {
    $(mobileMenuToggleButtonSpan).removeClass('glyphicon-menu-hamburger');
    $(mobileMenuToggleButtonSpan).addClass('glyphicon-remove');
    $(mobileMenu).show();
    $(mobileMenu).stop().animate({
        width: '300px',
    });
    $('body').css({
        overflow: 'hidden',
    });
}

function closeMobileMenu() {
    $(mobileMenuToggleButtonSpan).removeClass('glyphicon-remove');
    $(mobileMenuToggleButtonSpan).addClass('glyphicon-menu-hamburger');
    $(mobileMenu).stop().animate({
        width: '0px',
    }, () => {
        $(mobileMenu).hide();
    });
    $('body').css({
        overflow: 'auto',
    });
}
