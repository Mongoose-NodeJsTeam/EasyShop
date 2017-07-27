/* globals $ */

$().ready(() => {
    $('#userSignInForm').validate({
        rules: {
            username: {
                required: true,
                minlength: 2,
                maxlength: 15,
                regx: /^[a-zA-Z0-9_\\.]+$/
            },
            password: {
                required: true,
                minlength: 4,
                maxlength: 12,
                regx: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,12}$/
            },
        },
        messages: {
            username: {
                required: 'Username is required!',
                minlength: 'Username should be at least 2 symbols long!',
                maxlength: 'Username should not be more than 15 symbols long!',
                regx: 'Username should contain only latin letters, numbers, . and _'
            },
            password: {
                required: 'Password is required!',
                minlength: 'Password should be at least 4 symbols long!',
                maxlength: 'Password should not be more than 12 symbols long',
                regx: 'Password should contain latin letters and numbers!'
            }
        },
        errorPlacement: function(error, element) {
            error.css({ 'color': 'red',
                'font-size': '110%',
                'font-style': 'italic'
            });

            if (element.attr('name') === 'username' )
                error.insertAfter('#usernameInputGroup');
            else if (element.attr('name') === 'password' )
                error.insertAfter('#passwordInputGroup');
        }
    });
});

$.validator.addMethod('regx', function(value, element, regexpr) {
    return regexpr.test(value);
});