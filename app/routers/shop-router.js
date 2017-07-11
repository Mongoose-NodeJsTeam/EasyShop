const express = require('express');

module.exports = function (app) {
    const shopController = require('../controllers/shop-controller')();

    const shopRouter = new express.Router();

    shopRouter
        .get('/my-shops', shopController.loadMyShopsPage)
        .get('/add-shop', shopController.loadAddNewShopPage)
        .post('/add-shop', shopController.createNewShop)
        .get('/:id', shopController.loadSpecifiedShop);

    app.use('/shop', shopRouter);
};