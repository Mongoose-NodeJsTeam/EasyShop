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
        if (!req.isAuthenticated()) {
            return res.redirect('/auth/sign-in');
        }

        if (!req.user.isProUser) {
            return res.render('unauthorized');
        }

        const shop = req.body;
        const user = req.user;
        shop.user = {
            id: user._id,
            username: user.username,
            isProUser: user.isProUser
        };


        return Promise.all(
            [
                this.data.shops.create(shop),
                this.data.users.filterBy({_id: user._id}),
            ]
        ).then(([dbShop, dbUsers]) => {
            const dbUser = dbUsers[0];
            this.data.users.addShopToUser(dbUser, shop);
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

    loadMyShopsPage(req, res) {
        if (!req.isAuthenticated()) {
            return res.redirect('/auth/sign-in');
        }

        if (!req.user.isProUser) {
            return res.render('unauthorized');
        }

        const userId = req.user._id;

        return this.data.shops.findAllUserShopsByUserId(userId)
            .then((shops) => {
                res.render('shop/myShopsPage', {
                    user: req.user,
                    shops: shops
                });
            });
    }

    loadSpecifiedShop(req, res) {
        if (!req.isAuthenticated()) {
            return res.redirect('/auth/sign-in');
        }

        const shopId = req.params.id;

        return this.data.shops.findById(shopId)
            .then((shop) => {
                return res.render('shop/shopDetails', {
                    user: req.user,
                    shop: shop
                });
            });
    }

    loadGeneralInfoAboutShop(req, res) {
        if (!req.isAuthenticated()) {
            return res.redirect('/auth/sign-in');
        }

        const shopId = req.params.id;

        return this.data.shops.findById(shopId)
            .then((shop) => {
                return res.send({
                    shop: shop
                });
            });
    }

    updateSpecifiedShop(req, res) {
        const shopEditData = req.body;
        const shopId = req.params.id;

        if (!req.isAuthenticated()) {
            return res.redirect('/auth/sign-in');
        }

        if (!req.user.isProUser) {
            return res.render('unauthorized');
        }

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
        if (!req.isAuthenticated()) {
            return res.redirect('/auth/sign-in');
        }

        if (!req.user.isProUser) {
            return res.render('unauthorized');
        }

        const shopId = req.params.id;

        return this.data.shops.deleteById(shopId)
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

