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
}

module.exports = TripshopData;