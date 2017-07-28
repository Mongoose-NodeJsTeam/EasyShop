const express = require('express');

const attachTo = (app, data) => {
    const homeController = require('../controllers/home-controller').init(data);

    const homeRouter = new express.Router();
    homeRouter
        .get('/', homeController.loadHomePage)
        .get('/profile', homeController.loadProfilePage);

    app.use('/', homeRouter);
};

module.exports = { attachTo };