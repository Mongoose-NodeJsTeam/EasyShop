/* globals $ */

calculateTotal();

$('.plus').click(function(e) {
    let $target = $(e.target);

    const target = $('.quantity', this.parentNode)[0];
    target.value = +target.value + 1;
    updateTotal($target);
});
$('.minus').click(function(e) {
    let $target = $(e.target);
    let target = $('.quantity', this.parentNode)[0];
    if (target.value > 1) {
        target.value = +target.value - 1;
    }
    updateTotal($target);
});
$('.removeProduct').click(function(e) {
    let $target = $(e.target);
    let parent = $target.parent().parent();
    parent.remove();
    calculateTotal();
});
$('#ContinueShop').click(function() {
    updateBasketIfquantityModified();
});
$('#checkBasket').on('click', function() {
    updateBasketIfquantityModified();
    const dateOfTrip = $('#dataTrip').html();


    const allProduxtsInBasket = [];


    const allproducts = $('.productsInformation');
    for (let i = 0; i < allproducts.length; i++) {
        const $productData = $(allproducts[i]).children();
        const shopperdata = $($productData[0]).children();
        const shopper = shopperdata[0].innerHTML;
        const shopperId = shopperdata[0].attributes[0].value;
        const userId = shopperdata[0].attributes[1].value;
        const tripId = shopperdata[0].attributes[2].value;
        const productName = $productData[1].innerText.trim();//TODO ima nqkuv nov red nakraq na product name
        const productQuantity = $productData[2].children[2].value;
        const productPrice = $productData[3].innerText;
        const productTotal = $productData[4].innerText;


        const product = {
            userId: userId,
            tripId: tripId,
            shopper: shopper,
            shopperId: shopperId,
            product: productName,
            quantity: productQuantity,
            price: productPrice,
            total: productTotal,
            date: dateOfTrip
        };

        allProduxtsInBasket.push(product);
    }
    const form = $("<form/>",
        {
            action: '/basket/validate',
            method: 'POST',
            headers: {
                "content-type": "application/json"
            }
        });
    for (let i = 0; i < allProduxtsInBasket.length; i++) {
        $('<input>').attr('type', 'hidden')
            .attr('name', "product" + i)
            .attr('value', JSON.stringify(allProduxtsInBasket[i]))
            .appendTo(form);

    }
    const keyProducts = takeKeyFromProductsInBasket();

    //remove items in local storage that are already validate
    //foreach item in local storage if key=allproduxt in basket.key, localstorage.remove(key)
    const keysLocalStorage = Object.keys(localStorage);
    for (const key of keysLocalStorage) {
        let matched = false;
        if (Number(key)) {
            for (const basketKey of keyProducts) {
                if (basketKey === key) {
                    matched = true;
                }
            }
            if (matched) {
                localStorage.removeItem(key);
            }
        }
    }


    $(document.body).append(form);
    form.submit();


    return false; // cancel the actual link
});

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

function updateBasketIfquantityModified() {
    let allProductsinBasket = $('.productInBasket');
    let productKeysInBasket = [];

    for (let i = 0; i < allProductsinBasket.length; i++) {
        //iterate over table and take all rows,each row=product,take key related in local storage
        let productKey = $(allProductsinBasket[i]).attr('data-key');

        //productKeysInBasket=array of the keys, matching each product in local storage
        productKeysInBasket.push(productKey);

        //select Dom element who cantains the atribute key
        let $prod = $('.productInBasket').filter(function () {
            return $(this).attr('data-key') === productKey;
        });
        //select quantity from the input field,which is next dom element
        let input = $prod.next().children()[2].value;


        let productInLocal = JSON.parse(localStorage[productKey]);

        //if product quantity is set to 0 in basket=>remove item
        if (allProductsinBasket[i].quantity === 0) {
            localStorage.removeItem(productKey)
        }
        //update the product in local storage with the correct quantity and total
        else {
            productInLocal.quantity = Number(input);
            productInLocal.total = Number(productInLocal.price) * Number(input);

            localStorage[productKey] = JSON.stringify(productInLocal);
        }

    }
    //remove the prodcut drom local storage, if remove from basket
    //TODO make function for this,almost the same in chechout basket,make one file,instead of two ???
    let keysLocalStorage = Object.keys(localStorage);
    for (let key of keysLocalStorage) {
        let matched = false;
        if (Number(key)) {
            for (let basketKey of productKeysInBasket) {
                if (basketKey === key) {
                    matched = true;
                }
            }
            if (!matched) {
                localStorage.removeItem(key);
            }
        }
    }
}

function takeKeyFromProductsInBasket() {
    const allProductsinBasket = $('.productInBasket');
    const productKeysInBasket = [];
    for (let i = 0; i < allProductsinBasket.length; i++) {
//iterate over table and take all rows
// ,each row=product,take key related in local storage
        const productKey = $(allProductsinBasket[i]).attr('data-key');
//productKeysInBasket=array of the keys, matching each product in local storage
        productKeysInBasket.push(productKey);
    }
    return productKeysInBasket;
}

