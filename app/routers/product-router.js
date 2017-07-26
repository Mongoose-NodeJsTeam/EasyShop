const express = require('express');

const attachTo = (app, data) => {
    const productRouter = new express.Router({ mergeParams: true });

    const productController = require('../controllers/product-controller')
        .init(data);

    productRouter
        .get('/add-product', productController.loadProductForm
            .bind(productController))
        .post('/add-product', productController.createProductForShop
            .bind(productController))
        //Ajax routes
        .get('/update-product/:productId', productController.loadProductInfo
            .bind(productController))
        .post('/update-product/:productId', productController.updateProduct
            .bind(productController))
        .get('/delete-product/:productId', productController.deleteProduct
            .bind(productController));

    app.use('/shop/:id', productRouter);
};

module.exports = { attachTo };