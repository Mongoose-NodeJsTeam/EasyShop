const BaseData = require('./baseData');
const Product = require('../models/productModel');
const ObjectID = require('mongodb').ObjectID;

class ProductData extends BaseData {
    constructor(db) {
        super(db, Product);
    }

    updateProductById(productId, newProductData) {
        return this.collection.updateOne(
            { _id: new ObjectID(productId) },
            {
                $set: {
                    name: newProductData.name,
                    price: newProductData.price,
                    weight: newProductData.weight
                }
            }
        );
    }

    deleteProductByShopId(shopId) {
        return this.collection.remove({
            shopId: shopId
        });
    }
}

module.exports = ProductData;