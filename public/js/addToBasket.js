/* globals $*/

$(document).ready(function() {
    $('.quantitySetter').on('change', function() {
        const quantity = $(this).val();
        $(this).next().attr('data-quantity', quantity);
    });

    $('.addToBasket').on('click', function(e) {
        const productQuantity = $(e.target).attr('data-quantity');

        if (productQuantity > 0) {
            let counter = localStorage.getItem('counter');
            if (counter === null) {
                counter = 0;
            }

            counter++;
            localStorage.setItem('counter', counter);

            const userId = $(e.target).attr('data-user');
            const tripDate = $(e.target).attr('data-date');
            const shopper = $(e.target).attr('data-shopper');
            const shopperId = $(e.target).attr('data-shopperId');
            const tripId = $(e.target).attr('data-tripshopId');
            const productId = $(e.target).attr('data-Productid');
            const shopId = $(e.target).attr('data-shop');
            const productName = $(e.target).attr('data-name');
            const productPrice = $(e.target).attr('data-price');
            const prodTotal = (+productPrice * +productQuantity).toFixed(2);

            const product = {
                key: counter,
                userId: userId,
                shopper: shopper,
                shopperId: shopperId,
                tripDate: tripDate,
                tripId: tripId,
                shopId: shopId,
                productId: productId,
                name: productName,
                price: productPrice,
                quantity: productQuantity.toString(),
                total: prodTotal,
            };

            if (counter > 1) {
                const keysLocalStorage = Object.keys(localStorage);
                let keyIsString=true;
                let mustBeAdded=true;
                for (const key of keysLocalStorage) {
                    if(Number(key)){
                        keyIsString=false;
                    }
                    if (Number(key) && Number(key) !== counter) {
                        const productAlreadyInShop =
                            JSON.parse(localStorage[key]);

                        if (productAlreadyInShop.shopId !== product.shopId) {
                            mustBeAdded=false;
                            alert('The products must be from the same shop');
                            window.location = '/shop/' +
                                productAlreadyInShop.shopId;
                        }

                        if (productAlreadyInShop.productId ===
                            product.productId) {
                            mustBeAdded=false;
                            productAlreadyInShop.quantity =
                                Number(product.quantity) +
                                Number(productAlreadyInShop.quantity);

                            productAlreadyInShop.total =
                                +productAlreadyInShop.quantity *
                                +productAlreadyInShop.price;


                            return localStorage.setItem(
                                productAlreadyInShop.key,
                                JSON.stringify(productAlreadyInShop));
                        }

                        if (productAlreadyInShop.tripId !== product.tripId ||
                            productAlreadyInShop.userId !== userId) {
                            mustBeAdded=false;
                            alert('You have already ' +
                                'items from different' +
                                'trip in your basket. ' +
                                'Please Validate or Cancel ');
                            $('#loadShoppingCart').trigger('click');
                            break;
                        }
                    }
                }
                if (keyIsString||mustBeAdded) {
                    localStorage[counter] = JSON.stringify(product);
                }
            }
            if (counter === 1) {
                localStorage[counter] = JSON.stringify(product);
            }
        }
        else {
            return alert('Must selected quantity');
        }
    });
});
