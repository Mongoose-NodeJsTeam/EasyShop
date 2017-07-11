const proUserData = require('../data/proUserData');

module.exports = function () {
    return {
        loadMyShopsPage(req, res) {
            res.status(200)
                .render('shop/myShopsPage', {
                    user: req.user
                });
        },
        loadAddNewShopPage(req, res) {
            res.status(200)
                .render('shop/addNewShop', {
                    user: req.user
                });
        },
        createNewShop(req, res) {
            const modelShop = req.body;

            proUserData.proUsers.addNewShop(
                req.user.id,
                modelShop.name,
                modelShop.address,
                modelShop.email,
                modelShop.mobile,
                modelShop.description
            );

            res.redirect('my-shops');
        },
        loadSpecifiedShop(req, res) {
            const userId = req.user.id;
            const shopId = req.params.id;

            return proUserData.proUsers.findShopById(userId, shopId)
                .then((shop) => {
                    res.render('shop/shopDetails', {
                        user: req.user,
                        shop: shop
                    });
                });
        }
    };
};
