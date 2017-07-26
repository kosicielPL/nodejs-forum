/* globals $ */
function hideBootstrapElem(selector1, selector2, callback) {
  $(selector1).removeClass('show', 0, '_default', function() {
    $(selector1).addClass('hide');
  });

  callback(selector2);
}

function showBootstrapElem(selector) {
  $(selector).removeClass('hide', 0, '_default', function() {
    $(selector).addClass('show');
  });
  // const input = $(selector).children()[0];
  // if ($(input).prop('tagName') === 'INPUT') $(input).focus();
}

function toggleBootstrapElems(selector1, selector2) {
  if ($(selector1).hasClass('show')) {
    hideBootstrapElem(selector1, selector2, showBootstrapElem);
  } else {
    hideBootstrapElem(selector2, selector1, showBootstrapElem);
  }
}

$(document).ready(function() {
  $('#settings-username-btn').on('click', function() {
    toggleBootstrapElems('#settings-username-placeholder', '#settings-username-input');
    $('#settings-username-btn').find('span').toggleClass('glyphicon-edit').toggleClass('glyphicon-ok');
  });

  $('#settings-username-input').focusout(function() {
    toggleBootstrapElems('#settings-username-placeholder', '#settings-username-input');
    $('#settings-username-btn').find('span').toggleClass('glyphicon-edit').toggleClass('glyphicon-ok');
  });
});
