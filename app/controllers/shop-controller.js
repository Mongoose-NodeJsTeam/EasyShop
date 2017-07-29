class ShopController {
    constructor(data) {
        this.data = data;
    }

    getAddShopForm(req, res) {
        if (!req.isAuthenticated()) {
            return res.redirect('/auth/sign-in');
        }

        if (!req.user.isProUser) {
            return res.render('unauthorized');
        }

        return res.render('shop/addNewShop');
    }

    createShop(req, res) {
        const shop = req.body;
        const user = req.user;

        this.data.shops.findByShopName(shop.name)
            .then((foundShop) => {
                if (foundShop) {
                    return res.redirect('/shop/add-shop');
                } else {
                    shop.user = {
                        id: user._id,
                        username: user.username,
                        isProUser: user.isProUser
                    };

                    return Promise.all(
                        [
                            this.data.shops.create(shop),
                            this.data.users.findByUsername(user.username),
                        ]
                    ).then(([dbShop, dbUser]) => {
                        dbUser.username = user.username;
                        dbUser.password = user.password;
                        dbUser.address = user.address;
                        dbUser.isProUser = user.isProUser;
                        dbUser.email = user.email;
                        dbUser.tripshops = user.tripShops || [];

                        dbUser.shops = user.shops || [];
                        dbUser.shops.push({
                            name: dbShop.name,
                            user: dbShop.username,
                            address: dbShop.address,
                            mobile: dbShop.mobile,
                            email: dbShop.email,
                            description: dbShop.description,
                            products: dbShop.products || []
                        });

                        return this.data.users.updateById(dbUser);
                    })
                        .then(() => {
                            req.flash(
                                'success',
                                'New shop added successfully!!');
                            return res.redirect('/shop/my-shops');
                        })
                        .catch((err) => {
                            console.log('shiiiiiiit');
                            req.flash('error', err);
                            return res.redirect('/shop/add-shop');
                        });
                }
            });
    }

    loadMyShopsPage(req, res) {
        const userId = req.user._id;

        this.data.shops.findAllUserShopsByUserId(userId)
            .then((shops) => {
                res.render('shop/myShopsPage', {
                    user: req.user,
                    shops: shops
                });
            });
    }

    loadSpecifiedShop(req, res) {
        const shopId = req.params.id;

        this.data.shops.findById(shopId)
            .then((shop) => {
                return res.render('shop/shopDetails', {
                    user: req.user,
                    shop: shop
                });
            });
    }

    loadGeneralInfoAboutShop(req, res) {
        const shopId = req.params.id;

        this.data.shops.findById(shopId)
            .then((shop) => {
                return res.send({
                    shop: shop
                });
            });
    }

    updateSpecifiedShop(req, res) {
        const shopEditData = req.body;
        const shopId = req.params.id;

        return this.data.shops.updateShopById(shopId, shopEditData)
            .then(() => {
                req.flash(
                    'success',
                    'Shop was successfully updated');
                return res.send({ locationUrl: '/shop/my-shops' });
            })
            .catch((err) => {
                req.flash('error', err);
                return res.send({ locationUrl: '/shop/my-shops' });
            });
    }

    deleteShop(req, res) {
        const shopId = req.params.id;

        this.data.shops.deleteById(shopId)
            .then(() => {
                req.flash(
                    'success',
                    'Shop was successfully deleted');
                return res.send({ locationUrl: '/shop/my-shops' });
            });
    }
}

const init = (data) => {
    return new ShopController(data);
};

module.exports = { init };

