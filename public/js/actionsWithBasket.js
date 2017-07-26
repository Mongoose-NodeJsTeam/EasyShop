/* globals $ */

calculateTotal();

$('.plus').click(function (e) {
    let $target = $(e.target);

    const target = $('.quantity', this.parentNode)[0];
    target.value = +target.value + 1;
    updateTotal($target);
});
$('.minus').click(function (e) {
    let $target = $(e.target);
    let target = $('.quantity', this.parentNode)[0];
    if (target.value > 1) {
        target.value = +target.value - 1;
    }
    updateTotal($target);
});

$('.removeProduct').click(function (e) {
    let $target = $(e.target);
    let parent = $target.parent().parent();
    parent.remove();
    calculateTotal();

});

function quantityChange(sender) {
    let quantity = $(sender).val();

    console.log(quantity);
}

function updateTotal($target) {

    let sum = 0;
    //Add each product price to total

    let prodPrice = $target.parent().siblings(".productPrice");
    let price = prodPrice.text();

    let quantity = $target.siblings(".quantity").val();
    //Total for one product
    let subtotal = Number(price) * Number(quantity);
    //Round to 2 decimal places.
    subtotal = subtotal.toFixed(2);
    //Display subtotal in HTML element
    let total = $target.parent().siblings(".calculateTotal");
    total.text(subtotal);
    calculateTotal();

}

function calculateTotal() {
    let sum = 0;
    let totalsEachProduct = $('.calculateTotal');


//not good innertext vij s jquery imasheza iteraciq
    for (let i = 0; i < totalsEachProduct.length; i++) {
        let $prod = $(totalsEachProduct[i]);
        let subTotal = Number($prod.text());
        sum = Number(sum) + Number(subTotal);
        sum.toFixed(2);

    }
    $('#TotalBasket').text(sum);//must set lenght to 2
}

$('#ContinueShop').click(function () {
    let allProductsinBasket = $('.productInBasket');
    let productKeysInBasket = [];

    for (let i = 0; i < allProductsinBasket.length; i++) {
        let productKey = $(allProductsinBasket[i]).attr('data');
        productKeysInBasket.push(productKey);

        let $prod = $('.productInBasket').filter(function () {
            return $(this).attr('data') === productKey;
        });

        let input = $prod.next().children()[2].value;

        let productInLocal = JSON.parse(localStorage[productKey]);
        if (allProductsinBasket[i].quantity === 0) {
            localStorage.removeItem(productKey)
        }
        else {
            productInLocal.quantity = Number(input);
            productInLocal.total = Number(productInLocal.price) * Number(input);

            localStorage[productKey] = JSON.stringify(productInLocal);
        }

    }
    let keysLocalStorage = Object.keys(localStorage);
    for (let key of keysLocalStorage) {
        let matched=false;
        if (Number(key)) {
            for (let basketKey of productKeysInBasket) {

                if (basketKey === key) {
                    matched=true;
                }

            }
            if(!matched){localStorage.removeItem(key);}

        }
    }
});