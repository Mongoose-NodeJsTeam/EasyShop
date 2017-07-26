/* globals $*/
$(document).ready(function () {
    $('.quantitySetter').on('change',function(){

        const quantity=$(this).val();
        $(this).next().attr('data-quantity',quantity);


    });

    $('.addToBasket').on('click', function (e) {
        let counter = localStorage.getItem('counter');
        if (counter === null) {
            counter = 0;
        }
        counter++;
        localStorage.setItem('counter', counter);

        const productId = $(e.target).attr('data-id');
        const shopId = $(e.target).attr('data-shop');
        const productName = $(e.target).attr('data-name');
        const productPrice = $(e.target).attr('data-price');
        let productQuantity = $(e.target).attr('data-quantity');
        if(productQuantity===undefined){productQuantity=0}
        const prodTotal=(+productPrice*+productQuantity).toFixed(2);


        const product = {
            key:counter,
            id: productId,
            shopId: shopId,
            name: productName,
            price: productPrice,
           quantity:productQuantity.toString(),
            total: prodTotal

        };


        localStorage[counter] =JSON.stringify(product);


    });
});
