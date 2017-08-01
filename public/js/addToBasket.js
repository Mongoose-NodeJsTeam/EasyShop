/* globals $*/
$(document).ready(function () {
    $('.quantitySetter').on('change', function () {

        const quantity = $(this).val();
        $(this).next().attr('data-quantity', quantity);


    });

    $('.addToBasket').on('click', function (e) {
        let productQuantity = $(e.target).attr('data-quantity');
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

            //TODO validation if quantity ===0
            // if (productQuantity === 0) {
            //     alert("You have already items from different trip in your basket. Please Validate or Cancel ");
            //     break;
            // }

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
            //alert ako sa razlichni shops
            if (counter > 1) {
                let keysLocalStorage = Object.keys(localStorage);
                for (let key of keysLocalStorage) {
                    if (Number(key) && Number(key) !== counter) {
                        let productAlreadyInShop = JSON.parse(localStorage[key]);
                        //proverka za dali e sashtiq user
                        if (productAlreadyInShop.shopId !== product.shopId) {
                            alert("The products must be from the same shop");
                            window.location = '/shop/' + productAlreadyInShop.shopId;
                        }
                    }
                }
            }
            if (counter === 1) {
                localStorage[counter] = JSON.stringify(product);
            }
            //check if user have already a tripshop in the basket
            if (counter > 1) {
                const keysLocalStorage = Object.keys(localStorage);
                for (let key of keysLocalStorage) {
                    if (key !== 'counter') {
                        if (Number(key) !== counter) {
                            const productAlreadyInShop =
                                JSON.parse(localStorage[key]);
                            //proverka za dali e sashtiq user, i sashtiq trip
                            if (productAlreadyInShop.tripId === undefined ||
                                productAlreadyInShop.tripId === product.tripId||
                                productAlreadyInShop.userId!==userId) {
        //parvata proverka e zashtoto product ne dobavq ako zanulim koshnicata

                                localStorage[counter] = JSON.stringify(product);
                                break;
                            } else {
                                alert('You have already ' +
                                    'items from different' +
                                    'trip in your basket. ' +
                                    'Please Validate or Cancel ');
                                $('#loadShoppingCart').trigger('click');
                                break;
                            }
                        }
                    } else {
                        localStorage[counter] = JSON.stringify(product);
                    }
                }
            }
        } else {
            alert('Must selected quantity');
        }
    });
});
