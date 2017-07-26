const BaseData = require('./baseData');
const Product = require('../models/productModel');
const ObjectID = require('mongodb').ObjectID;

class ProductData extends BaseData {
    constructor(db) {
        super(db, Product);
    }

    createNewProduct(shopId, model) {
        const newProduct = Product.toViewModel(model);
        newProduct.shopId = shopId;

        this.collection.insertOne(newProduct);

        return newProduct;
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
}

module.exports = ProductData;