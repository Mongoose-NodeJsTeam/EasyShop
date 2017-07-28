/* globals $*/
$(document).ready(function () {

    $('#loadShoppingCart').on('click', function () {

//1.strigify objecta kogato se sazdava, vkarvash go v storaga
// 2. prashta se vinagi stringifynat object
// 3. vseki edin input field predstavlqva property v objecta teq.body
// .4 ako e masiv ot obekti pristiga kato req.body . name :[object object],koeto v deistvitelnost predstavqva stringifinatiqt obekt
// 5 pravi se iteraciq po propertita na req.body i se parstva vsqko valu


        var form = $("<form/>",
            {
                action: '/basket',
                method: 'POST',
                headers: {
                    "content-type": "application/json"
                }
            });
        let keysLocalStorage=Object.keys(localStorage);


        for (let key of keysLocalStorage) {
            if (Number(key)) {

                $('<input>').attr('type', 'hidden')
                    .attr('name', "product" + key)
                    .attr('value', (localStorage.getItem(key)))
                    .appendTo(form)
            }

        }

        $(document.body).append(form);
        form.submit();


        return false; // cancel the actual link
    });

});