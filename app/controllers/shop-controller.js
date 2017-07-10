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
        }
    };
};
