const BaseData = require('./baseData');
const Tripshop = require('../models/tripshopModel');


class TripshopData extends BaseData {
    constructor(db) {
        super(db, Tripshop);
    }

    create(modelData, shop, user) {
       const modelUpdateData={
           date: modelData.date,
           shop: shop,
           user: user
       };

        return this.collection.insertOne(modelUpdateData)
            .then(() => {
                return this.ModelClass.toViewModel(modelUpdateData);
            });
    }
    addBasketToTripshop(tripshop, basket) {
        if (tripshop.baskets) {
            return this.collection.updateOne({
                _id: tripshop._id
            }, {
                $push: {
                    baskets: basket
                }
            });
        } else {
            return this.collection.updateOne({
                _id: tripshop._id
            }, {
                $set: {
                    baskets: [basket]
                }
            });
        }

    }
}

module.exports = TripshopData;