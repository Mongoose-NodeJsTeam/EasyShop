const express = require('express');

const attachTo = (app, data) => {
    const tripshopRouter = new express.Router({ mergeParams: true });

    const tripshopController = require('../controllers/tripShop-controller')
        .init(data);

    tripshopRouter
        .get('/', tripshopController.loadTripshopForm
            .bind(tripshopController))
        .get('/findTripshop', tripshopController.loadAllTripshops
            .bind(tripshopController))

        .post('/add-tripshop', tripshopController.createTripshop
            .bind(tripshopController))
        .get('/add-tripshop', tripshopController.loadTripshopCreationalForm
            .bind(tripshopController))
        .get('/:id', tripshopController.loadProducts
            .bind(tripshopController));

    app.use('/tripshops', tripshopRouter);
};

module.exports = { attachTo };