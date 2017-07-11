const proUserData = require('../data/proUserData');

module.exports = function () {
    return {
        loadAddNewProductPage(req, res) {
            const proUserId = req.user.id;
            const shopId = req.params.shopId;

            return proUserData.proUsers.findShopById(proUserId, shopId)
                .then((shop) => {
                    res.status(200)
                        .render('product/addNewProduct', {
                            user: req.user,
                            shop: shop
                        });
                });
        },
        addNewProduct(req, res) {
            const shopId = req.params.shopId;
            const modelProduct = req.body;

            proUserData.proUsers.addNewProduct(
                req.user.id,
                shopId,
                modelProduct.name,
                modelProduct.price,
                modelProduct.weight
            );

            res.redirect('/shop/' + shopId);
        }
    };
};
