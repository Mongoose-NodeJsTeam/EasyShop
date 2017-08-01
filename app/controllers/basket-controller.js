const ObjectID = require('mongodb').ObjectID;

class BasketController {
    constructor(data) {
        this.data = data;
    }

    loadBasketPage(req, res) {
        if (!req.isAuthenticated()) {
            return res.redirect('/auth/sign-in');
        }

        if (req.user.isProUser) {
            return res.render('unauthorized');
        }

        const userId = req.user._id.toString();
        const user = req.user;

        const products = (req.body);
        let tripId;
        let date;
        let shopperId;

        const arr = [];

        for (const key in products) {
            if (products.hasOwnProperty(key)) {
                const item = JSON.parse(products[key]);

                //load just products that the autenticate user command
                if ((item.userId) === userId) {
                    arr.push((item));
                    tripId = item.tripId;
                    date = item.tripDate;
                    shopperId = item.userId;
                }
            }
        }

        return res.render('basket', {
            products: arr,
            user: user,
            tripId: tripId,
            date: date
        });
    }

    basketCheckOut(req, res) {
        if (!req.isAuthenticated()) {
            return res.redirect('/auth/sign-in');
        }

        if (req.user.isProUser) {
            return res.render('unauthorized');
        }

        const products = (req.body);
        const basket = [];
        let tripId;
        let shopperId;
        let buyerID;
        let shopperName;
        const userId = req.user._id.toString();

        for (const key in products) {
            if (products.hasOwnProperty(key)) {
                const item = JSON.parse(products[key]);
                if (item.userId === userId) {
                    basket.push((item));
                    shopperId = item.shopperId;
                    tripId = item.tripId;
                    buyerID = item.userId;
                    shopperName=item.shopper;
                }
            }
        }

        const basketTripshops = {
            basket: basket,
            buyer: {
                username: req.user.username,
                buyersId: req.user._id
            },
            tripId: tripId

        };

        const basketToUser = {
            basket: basket,
            bayerId: buyerID,
            tripId: tripId,
            shopperName: shopperName
        };

        return Promise.all(
            [
                this.data.users.filterBy({
                    _id: new ObjectID(userId)
                }),

                this.data.users.filterBy({
                    _id: new ObjectID(shopperId)
                })
            ]
        ).then(([user, shopper]) => {
            return Promise.all([
                this.data.users.addBasketToUser(
                    user[0],
                    basketToUser),

                this.data.users.addBuyersBasketToUser(
                    shopper[0],
                    basketTripshops)
            ]);
        }).then(() =>
            res.redirect('/profile'));
    }
}

const init = (data) => {
    return new BasketController(data);
};

module.exports = { init };