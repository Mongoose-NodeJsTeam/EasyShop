// /* globals $ */
//
// $().ready(() => {
//     $('#productForm').validate({
//     rules: {
//             name: {
//                 required: true,
//                 minlength: 2,
//                 maxlength: 15
//             },
//             price: {
//                 required: true,
//                 range: [0.01, 99.99],
//                 number: true
//             },
//             weight: {
//                 required:true,
//                 range: [0.01, 1000],
//                 number: true
//             }
//         },
//         messages: {
//             name: {
//                 required: 'Product name is required!',
//                 minlength: 'Product name should be at least 2 symbols long!',
//                 maxlength: 'Product name should not be more than 15 symbols long!'
//             },
//             price: {
//                 required: 'Price is required!',
//                 range: 'Price should be bewtween 0.01 and 99!'
//             },
//             weight: {
//                 required: 'Weight is required!',
//                 range: 'Weight should be between 0.01 and  1000!',
//             },
//
//         },
//         errorPlacement: function(error, element) {
//             error.css({ 'color': 'red',
//                 'font-size': '110%',
//                 'font-style': 'italic',
//                 'float': 'right'
//             });
//
//             if (element.attr('name') === 'name' )
//                 error.insertAfter('#nameLabel');
//             else if (element.attr('name') === 'price' )
//                 error.insertAfter('#priceLabel');
//             else if (element.attr('name') === 'weight' )
//                 error.insertAfter('#weightLabel');
//
//         },
//     });
// });