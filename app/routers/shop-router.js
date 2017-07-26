const express = require('express');

const attachTo = (app, data) => {
    const shopController = require('../controllers/shop-controller').init(data);

    const shopRouter = new express.Router({ mergeParams: true });

    shopRouter
        .get('/my-shops', shopController.loadMyShopsPage
            .bind(shopController))
        .get('/add-shop', shopController.getAddShopForm)
        .post('/add-shop', shopController.createShop
            .bind(shopController))
        .get('/:id', shopController.loadSpecifiedShop
            .bind(shopController))
        //Ajax routes
        .get('/:id/update-shop', shopController.loadGeneralInfoAboutShop
            .bind(shopController))
        .post('/:id/update-shop', shopController.updateSpecifiedShop
            .bind(shopController))
        .get('/:id/delete-shop', shopController.deleteShop
            .bind(shopController));

    app.use('/shop', shopRouter);
};

module.exports = { attachTo };