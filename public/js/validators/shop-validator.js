/* globals $ */

$().ready(() => {
    $('#shopForm').validate({
        rules: {
            name: {
                required: true,
                minlength: 1,
                maxlength: 20,
                regx: /^[a-zA-Z0-9_\\.]+$/
            },
            address: {
                required: true,
                minlength: 10,
                maxlength: 60,
                regx: /^[a-zA-z\d\s\\.\-]+$/
            },
            email: {
                required: true,
                email: true
            },
            mobile: {
                required: true,
                minlength: 10,
                maxlength: 10,
                number: true
            },
            description: {
                required: true,
                minlength: 10,
                maxlength: 40,
            },
        },
        messages: {
            name: {
                required: 'Shop name is required!',
                minlength: 'Shop name should be at least 1 symbols long!',
                maxlength: 'Shop name should not be more than 20 symbols long!',
                regx: 'Shop name should contain only latin letters, numbers, . and _'
            },
            address: {
                required: 'Address is required!',
                minlength: 'Address should be at least 10 symbols long!',
                maxlength: 'Address should not be more than 60 symbols long!',
                regx: 'Address should contain only latin letters, numbers, white spaces, (-), (.)!'
            },
            email: 'Enter valid email please!',
            mobile: {
                required: 'Mobile is required!',
                minlength: 'Mobile should be exactly 10 digits!',
                maxlength: 'Mobile should be exactly 10 digits!'
            },
            description: {
                required: 'Description is required!',
                minlength: 'Description should be at least 10 symbols!',
                maxlength: 'Description should not be more than 40 symbols long!'
            },
        },
        errorPlacement: function(error, element) {
            error.css({ 'color': 'red',
                        'font-size': '110%',
                        'font-style': 'italic',
                        'float': 'right'
            });

            if (element.attr('name') === 'name' )
                error.insertAfter('#shopLabel');
            else if (element.attr('name') === 'address' )
                error.insertAfter('#addressLabel');
            else if (element.attr('name') === 'email' )
                error.insertAfter('#emailLabel');
            else if (element.attr('name') === 'mobile' )
                error.insertAfter('#mobileLabel');
            else if (element.attr('name') === 'description' )
                error.insertAfter('#descriptionLabel');
        }
    });
});

$.validator.addMethod('regx', function(value, element, regexpr) {
    return regexpr.test(value);
});