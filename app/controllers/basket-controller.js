const ObjectID = require('mongodb').ObjectID;

class BasketController {
    constructor(data) {
        this.data = data;
    }

    loadBasketPage(req, res) {
        const userId = req.user._id;
        const user = req.user;

        const products = (req.body);
        let tripId,
            date,
            shopperId;


        const arr = [];


        for (const key in products) {
            if (products.hasOwnProperty(key)) {
                const item = JSON.parse(products[key]);


                if (item.userId == userId) {
                    arr.push((item));
                    tripId = item.tripId;
                    date = item.tripDate;
                    shopperId = item.userId;
                }
            }
        }


        res.render('basket', {
            products: arr,
            user: user,
            tripId: tripId,
            date: date
        });
    }


    basketCheckOut(req, res) {
        const products = (req.body);
        const basket = [];
        let tripID;
        let shopperId;
        const userId = req.user._id;


        for (const key in products) {
            if (products.hasOwnProperty(key)) {
                const item = JSON.parse(products[key]);
                if (item.userId == userId) {
                    console.log(item);

//proverka dali itemite sa ot picha kadeto gi e porachal server chasta,item.userId ne e implementirano za momenta
//tripId=item.tripId
                }
                basket.push((item));

                shopperId = item.shopperId;


                tripID = item.tripId;
            }
        }

        const basketTripshops = {
            basket: basket,
            buyer: {
                username: req.user.username,
                buyersId: req.user._id
            }
        };
        return Promise.all(
            [
                this.data.users.filterBy({ _id: new ObjectID(userId) }),

                this.data.users.filterBy({ _id: new ObjectID(shopperId) })

            ]
        ).then(([user, shopper]) => {
            return Promise.all([
                this.data.users.addBasketToUser(user[0], basket),

                this.data.users.addBuyersBasketToUser(shopper[0], basketTripshops)

            ]);
        }).then(() =>
            res.redirect('/profile'));
    }
}

const init = (data) => {
    return new BasketController(data);
};

module.exports = { init };