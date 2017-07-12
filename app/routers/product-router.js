const express = require('express');

module.exports = function (app) {
    const productController = require('../controllers/product-controller')();

    const shopRouter = new express.Router({ mergeParams: true });

    shopRouter
        .get('/add-product', productController.loadAddNewProductPage)
        .post('/add-product', productController.addNewProduct)
        .get('/delete-product/:id', productController.deleteProduct);

    app.use('/shop/:shopId/product/', shopRouter);
};