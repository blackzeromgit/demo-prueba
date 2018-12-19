$(function () {

    $('#contact-form').validator();

    $('#contact-form').on('submit', function (e) {

        $('#contact-form').find('.messages').html('');

        // if the validator does not prevent form submit
        if (!e.isDefaultPrevented()) {
            // Submit response
            var messageAlert = 'alert-' + 'success';
            var messageText  = 'Formulario envíado';
            // Bootstrap alert box HTML
            var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
            $('#contact-form').find('.messages').html(alertBox);
            // empty the form
            $('#contact-form')[0].reset();
        }

        return false;
    })
});