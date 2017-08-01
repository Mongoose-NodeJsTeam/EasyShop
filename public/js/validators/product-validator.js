/* globals $ */

$().ready(() => {
    $('#productForm').validate({
    rules: {
            name: {
                required: true,
                minlength: 2,
                maxlength: 15,
                regx: /^[a-zA-Z\s]+$/
            },
            price: {
                required: true,
                range: [1, 100],
                number: true,
                regx: /^\d{1,3}$/
            },
            weight: {
                required:true,
                range: [1, 1000],
                number: true,
                regx: /^\d{1,4}$/
            }
        },
        messages: {
            name: {
                required: 'Product name is required!',
                minlength: 'Product name should be at least 2 symbols long!',
                maxlength: 'Product name should' +
                            ' not be more than 15 symbols long!',
                regx: 'Product name should' +
                      ' consist only lattin letters and spaces!'
            },
            price: {
                required: 'Price is required!',
                range: 'Price should be bewtween 1 and 100!',
                regx: 'Price should be integer(whole number)!'
            },
            weight: {
                required: 'Weight is required!',
                range: 'Weight should be between 1 and  1000!',
                regx: 'Price should be integer(whole number)!'
            },

        },
        errorPlacement: function(error, element) {
            error.css({ 'color': 'red',
                'font-size': '110%',
                'font-style': 'italic',
                'float': 'right'
            });

            if (element.attr('name') === 'name' ) {
                error.insertAfter('#nameLabel');
            }
            else if (element.attr('name') === 'price' ) {
                error.insertAfter('#priceLabel');
            }
            else if (element.attr('name') === 'weight' ) {
                error.insertAfter('#weightLabel');
            }
        },
    });
});

$.validator.addMethod('regx', function(value, element, regexpr) {
    return regexpr.test(value);
});