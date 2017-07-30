const BaseData = require('./baseData');
const Tripshop = require('../models/tripshopModel');

class TripshopData extends BaseData {
    constructor(db) {
        super(db, Tripshop);
    }

    create(modelData, shop, user) {
        if (!this.ModelClass.validator(modelData.date)) {
            return Promise.reject(
                'Tripshop date should be in 7 days range starting from today');
        }

        const modelUpdateData={
            date: modelData.date,
            shop: {
                name: shop.name,
                shopId: shop._id,
                products: shop.products
            },
            user: {
                username: user.username,
                userId: user._id,
                address: user.address
            }
        };

        return this.collection.insertOne(modelUpdateData)
            .then(() => {
                return this.ModelClass.toViewModel(modelUpdateData);
            });
    }
}

module.exports = TripshopData;