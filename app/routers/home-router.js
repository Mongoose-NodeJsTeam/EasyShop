const express = require('express');

module.exports = function(app) {
    const homeController = require('../controllers/home-controller')();

    const homeRouter = new express.Router();

    homeRouter
        .get('/', homeController.loadHomePage);

    app.use('/', homeRouter);
};