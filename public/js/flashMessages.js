/* globals $ */

$(document).ready(() => {
    setTimeout(() => {
        $('.message-alert').fadeIn(1000, () => {
            $('.message-alert').slideUp(1000);
        });
    }, 1500);
});