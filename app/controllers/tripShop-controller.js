class TripshopController {
    constructor(data) {
        this.data = data;
    }

    loadTripshopForm(req, res) {
        if (!req.isAuthenticated()) {
            return res.redirect('/auth/sign-in');
        }

        if (req.user.isProUser) {
            return res.render('unauthorized');
        }

    return res.render('tripshop/form', {
                user: req.user
            });
    }

    loadProducts(req, res) {
        if (!req.isAuthenticated()) {
            return res.redirect('/auth/sign-in');
        }

        if (req.user.isProUser) {
            return res.render('unauthorized');
        }

        const user = req.user;

        const tripId = req.params.id;

        return this.data.tripshops. findById(tripId)
            .then((tripshop)=>{
                res.render('tripshop/shopperProducts', {
                    userId: user._id,
                    shop: tripshop.shop,
                    products: tripshop.shop.products,
                    shopper: tripshop.user.username,
                    shopperId: tripshop.user.userId,
                    date: tripshop.date,
                    tripId: tripId
                });
            });
    }

    loadAllTripshops(req, res) {
        if (!req.isAuthenticated()) {
            return res.redirect('/auth/sign-in');
        }

        if (req.user.isProUser) {
            return res.render('unauthorized');
        }

        return this.data.tripshops.filterBy({
            'user.userId': {
                $ne: req.user._id
            }
        })
            .then((trips) => {
                res.status(200)
                    .render('tripshop/all', {
                        trips: trips
                    });
            });
    }

    loadTripshopCreationalForm(req, res) {
        if (!req.isAuthenticated()) {
            return res.redirect('/auth/sign-in');
        }

        if (req.user.isProUser) {
            return res.render('unauthorized');
        }

        return this.data.shops.getAll()
            .then((shops) => {
                res.status(200)
                    .render('tripshop/creationalForm', {
                        user: req.user,
                        shops: shops
                    });
            });
    }

    createTripshop(req, res) {
        if (!req.isAuthenticated()) {
            return res.redirect('/auth/sign-in');
        }

        if (req.user.isProUser) {
            return res.render('unauthorized');
        }

        const user = req.user;
        const shopId = req.body.shop;

        return this.data.shops.findById(shopId)
            .then((shop) => {
                this.data.tripshops.create(req.body, shop, user)
                    .then((tripshop) => {
                        Promise.all([
                            this.data.shops.assignTripshopToShop(
                                shop,
                                tripshop),
                            this.data.users.assignTripshoptoUser(
                                user,
                                tripshop)])
                            .then(() => {
                                req.flash('success', 'New tripshop created!');
                                res.redirect('/tripshops/');
                            });
                    })
                    .catch((err) => {
                        req.flash('error', err);
                        return res.redirect('/tripshops/add-tripshop');
                    });
            });
    }

    deleteTripShop(req, res) {
        const tripId = req.params.id;
        const userId = req.user._id;


        return Promise.all([
            this.data.tripshops.deleteById(tripId),
            this.data.users.deleteTripshopFromUser(userId, tripId),
            this.data.users.deleteBasketFromDeletedTripShop(userId, tripId),
            this.data.users.deleteBasketFromBuyerUser(tripId)
        ])
            .then(() => {
                req.flash('success', 'Tripshop deleted!');
                res.redirect('/tripshops/');
            });
    }
}

const init = (data) => {
    return new TripshopController(data);
};

module.exports = { init };