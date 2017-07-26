/* globals $*/

$(document).ready(function() {
    $('.btnEditProduct').click((e) => {
        const shopId = $(e.target).attr('shopid');
        const productId = $(e.target).attr('productid');

        $('#productEdit').on('show.bs.modal', () => {
            $.ajax({
                method: 'GET',
                url: '/shop/' + shopId + '/update-product/' + productId,
                data: {}
            })
                .then((result) => {
                    const product = result.product;
                    console.log('product' + product);

                    $('#editName').val(product.name);
                    $('#editPrice').val(product.price);
                    $('#editWeight').val(product.weight);
                });
        });

        $('#submitEditProduct').click(() => {
            $('#productEdit').on('submit', (o) => {
                o.preventDefault();
                $.ajax({
                    method: 'POST',
                    url: '/shop/' + shopId + '/update-product/' + productId,
                    data: $('#productForm').serialize(),
                    success: () => {
                        window.location = '/shop/' + shopId;
                    }
                });
            });
        });
    });

    $('.delProductBtn').on('click', (e) => {
        const shopId = $(e.target).attr('shopid');
        const productId = $(e.target).attr('productid');

        e.preventDefault();

        $.ajax({
            method: 'GET',
            url: '/shop/' + shopId + '/delete-product/' + productId,
            data: {},
            success: () => {
                window.location = '/shop/' + shopId;
            }
        });
    });
});