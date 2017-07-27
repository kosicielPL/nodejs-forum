/* globals $ */

$(document).on('change', ':file', function() {
    const input = $(this);
    const numFiles = input.get(0).files ? input.get(0).files.length : 1;
    const label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
    $('#avatar-text').val(label);
    if (numFiles > 0) {
        const reader = new FileReader();
        reader.onload = function(e) {
            $('#avatar-preview img').attr('src', e.target.result);
        };
        reader.readAsDataURL(input.get(0).files[0]);
    } else {
        $('#avatar-preview img').attr('src', '/img/avatars/default.png');
    }
    // input.trigger('fileselect', [numFiles, label]);
});
