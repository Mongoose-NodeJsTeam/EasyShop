/* globals $*/

$(document).ready(function() {
    $('.btnEditShop').click((e) => {
        const shopId = $(e.target).attr('shopid');
        console.log(shopId);

        $('#shopEdit').on('show.bs.modal', () => {
            $.ajax({
                method: 'GET',
                url: '/shop/' + shopId + '/update-shop',
                data: { 'shopId': shopId },
                contentType: 'application/json',
            })
                .then((result) => {
                    const shop = result.shop;

                    $('#editName').val(shop.name);
                    $('#editAddress').val(shop.address);
                    $('#editEmail').val(shop.email);
                    $('#editMobile').val(shop.mobile);
                    $('#editDescription').val(shop.description);
                });
        });

        $('#submitEditShop').click(() => {
            $('#shopEdit').on('submit', (o) => {
                o.preventDefault();
                $.ajax({
                    method: 'POST',
                    url: '/shop/' + shopId + '/update-shop',
                    data: $('#shopForm').serialize(),
                    success: (result) => {
                        window.location = result.locationUrl;
                    }
                });
            });
        });
    });

    $('.delShopBtn').on('click', (e) => {
        const shopId = $(e.target).attr('shopid');
        e.preventDefault();

        $.ajax({
            method: 'GET',
            url: '/shop/' + shopId + '/delete-shop',
            data: {},
            success: (result) => {
                window.location = result.locationUrl;
            }
        });
    });
});