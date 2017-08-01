const BaseData = require('./baseData');
const Shop = require('../models/shopModel');
const ObjectID = require('mongodb').ObjectID;

class ShopData extends BaseData {
    constructor(db) {
        super(db, Shop);
    }

    findByShopName(shopName) {
        return this.filterBy({
            name: new RegExp(shopName, 'i')
        })
            .then((shops) => shops[0]);
    }

    findAllUserShopsByUserId(userId) {
        return this.filterBy({
            'user.id': userId
        });
    }

    assignProductToShop(shopId, product) {
        return this.findById(shopId)
            .then((shop) => {
                if (shop.products) {
                    return this.collection.updateOne({
                        _id: shop._id
                    }, {
                        $push: {
                            products: product
                        }
                    });
                }

                return this.collection.updateOne({
                        _id: shop._id
                    }, {
                        $set: {
                            products: [product]
                        }
                    });
            });
    }

    assignTripshopToShop(shop, tripshop) {
        if (shop.tripshops) {
            return this.collection.updateOne({
                _id: new ObjectID(shop._id)
            }, {
                $push: {
                    tripshops: tripshop
                },
            });
        }
        return this.collection.updateOne({
                _id: new ObjectID(shop._id)
            }, {
                $set: {
                    tripshops: [tripshop],
                }
            }
        );
    }

    updateShopById(shopId, shopData) {
        if (!this._isModelValid(shopData)) {
            return Promise.reject('Model validation failed!');
        }

        return this.collection.updateOne({
                _id: new ObjectID(shopId)
            }, {
                $set: {
                    name: shopData.name,
                    description: shopData.description,
                    address: shopData.address,
                    email: shopData.email,
                    mobile: shopData.mobile
                }
            }
        );
    }

    updateProductInShop(shopId, productId, productData) {
        return this.collection.updateOne({
                _id: new ObjectID(shopId),
                products: {
                    $elemMatch: {
                        _id: new ObjectID(productId)
                    }
                }
            }, {
                $set: {
                    'products.$.name': productData.name,
                    'products.$.price': productData.price,
                    'products.$.weight': productData.weight
                }
            }
        );
    }

    deleteProductFromShop(shopId, productId) {
        return this.collection.updateOne({
            _id: new ObjectID(shopId)
        }, {
            $pull: {
                'products': {
                    _id: new ObjectID(productId)
                }
            }
        });
    }
}

module.exports = ShopData;