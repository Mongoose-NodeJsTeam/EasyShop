class TripshopController {
    constructor(data) {
        this.data = data;
    }

    loadTripshopForm(req, res) {
        res.status(200)
            .render('tripshop/form', {
                user: req.user
            });
    }

    loadAllTripshops(req, res) {
        return this.data.tripshops.filterBy({
            'user._id': {
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
        const user = req.user;
        const shopId = req.body.shop

        this.data.shops.findById(shopId)
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
                                res.redirect('/tripshops');
                            });
                    });
            });
    }
}

const init = (data) => {
    return new TripshopController(data);
};

module.exports = {init};