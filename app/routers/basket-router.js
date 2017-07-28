const express = require('express');

const attachTo = (app, data) => {
    const basketController = require('../controllers/basket-controller')
        .init(data);

    const basketRouter = new express.Router();

    basketRouter

        .post('/', basketController.loadBasketPage
            .bind(basketController))
        .post('/validate',basketController.basketCheckOut
            .bind(basketController));

    app.use('/basket', basketRouter);
};

module.exports = { attachTo };