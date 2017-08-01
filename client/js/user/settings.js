/* globals $ */
$(document).ready(function() {
  let inputOpen = {
    username: false,
    firstname: false,
    lastname: false,
    email: false,
    password: false,
  };

  let baseName = {
    username: $('#settings-username-placeholder').text(),
    firstname: $('#settings-firstname-placeholder').text(),
    lastname: $('#settings-lastname-placeholder').text(),
    email: $('#settings-email-placeholder').text(),
  };

  function closeOpenedInputs(obj, curr) {
    for (const key in obj) {
      const value = obj[key];

      if (typeof value === 'object') {
          closeOpenedInputs(value, curr);
      }

      if (key !== curr && value === true) {
          toggleInput(key);
          obj[key] = false;
      }
    }
  }

  function toggleInput(name) {
    const $placeholder = $('#settings-' + name + '-placeholder');
    const $form = $('#settings-' + name + '-form');
    const $input = $('#settings-' + name + '-input');
    const $btn = $('#settings-' + name + '-btn');

    if (name !== 'password') {
      if ($input.val() !== '') {
        $placeholder.text($input.val());
      } else {
        $placeholder.text(baseName[name]);
      }
    }


    $placeholder
      .toggleClass('show')
      .toggleClass('hide');
    console.log('placeholder toggled!');

    $form
      .toggleClass('show')
      .toggleClass('hide');
    console.log('input toggled!');

    if (name !== 'password') {
      $btn
        .find('span')
        .toggleClass('glyphicon-edit')
        .toggleClass('glyphicon-ok');
      console.log('btn toggled!');
    }


    if ($form.hasClass('show')) {
      $($input).focus();
    }
    closeOpenedInputs(inputOpen, name);

    if (inputOpen[name] === false) {
      inputOpen[name] = true;
    } else {
      inputOpen[name] = false;
    }
  }

  // username
  $('#settings-username-btn').click(function() {
    toggleInput('username');
  });

  // firstname
  $('#settings-firstname-btn').click(function() {
    toggleInput('firstname');
  });

  //  lastname
  $('#settings-lastname-btn').click(function() {
    toggleInput('lastname');
  });

  // email
  $('#settings-email-btn').click(function() {
    toggleInput('email');
  });

  // password
  $('#settings-password-btn').click(function() {
    toggleInput('password');
  });
});


