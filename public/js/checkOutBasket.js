/* globals $*/
$(document).ready(function () {
        function takeKeyFromProductsInBasket() {
            let allProductsinBasket = $('.productInBasket');
            let productKeysInBasket = [];
            for (let i = 0; i < allProductsinBasket.length; i++) {
                //iterate over table and take all rows,each row=product,take key related in local storage
                let productKey = $(allProductsinBasket[i]).attr('data-key');
                //productKeysInBasket=array of the keys, matching each product in local storage
                productKeysInBasket.push(productKey);

                return productKeysInBasket;

            }
        }

        $('#checkBasket').on('click', function () {
            let dateOfTrip = $('#dataTrip').html();


            let allProduxtsInBasket = [];


            let allproducts = $('.productsInformation');
            for (let i = 0; i < allproducts.length; i++) {
                let $productData = $(allproducts[i]).children();
                let shopperdata = $($productData[0]).children();
                let shopper = shopperdata[0].innerHTML;
                let shopperId = shopperdata[0].attributes[0].value;
                let productName = $productData[1].innerText.trim();//TODO ima nqkuv nov red nakraq na product name
                let productQuantity = $productData[2].children[2].value;
                let productPrice = $productData[3].innerText;
                let productTotal = $productData[4].innerText;


                let product = {
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
            let form = $("<form/>",
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
                    .appendTo(form)

            }
            let keyProducts = takeKeyFromProductsInBasket();

            //remove items in local storage that are already validate
            //foreach item in local storage if key=allproduxt in basket.key, localstorage.remove(key)
            let keysLocalStorage = Object.keys(localStorage);
            for (let key of keysLocalStorage) {
                let matched = false;
                if (Number(key)) {
                    for (let basketKey of keyProducts) {
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

    }
)
;