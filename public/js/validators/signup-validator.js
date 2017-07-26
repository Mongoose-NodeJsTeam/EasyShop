/* globals $ */

$().ready(() => {
    $('#userSignUpForm').validate({
        rules: {
            username: {
                required: true,
                minlength: 2,
                maxlength: 15
            },
            email: {
                required: true,
                email: true
            },
            address: {
                required: true,
                minlength: 10,
                maxlength: 60
            },
            password: {
                required: true,
                minlength: 4,
                maxlength: 12
            },
        },
        messages: {
            username: {
                required: 'Username is required!',
                minlength: 'Username should be at least 2 symbols long!',
                maxlength: 'Username should not be more than 15 symbols long!'
            },
            email: 'Enter valid email please!',
            address: {
                required: 'Address is required!',
                minlength: 'Address should be at least 10 symbols long!',
                maxlength: 'Address should not be more than 30 symbols long!',
            },
            password: {
                required: 'Password is required!',
                minlength: 'Password should be at least 4 symbols long!',
                maxlength: 'Password should not be more than 12 symbols long'
            },
        },
        errorPlacement: function(error, element) {
            error.css({ 'color': 'red',
                'font-size': '110%',
                'font-style': 'italic',
            });

            if (element.attr('name') === 'username' )
                error.insertAfter('#usernameInputGroup');
            else if (element.attr('name') === 'email' )
                error.insertAfter('#emailInputGroup');
            else if (element.attr('name') === 'address' )
                error.insertAfter('#addressInputGroup');
            else if (element.attr('name') === 'password' )
                error.insertAfter('#passwordInputGroup');
        }
    });
});