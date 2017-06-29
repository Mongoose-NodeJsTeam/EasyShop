const express = require('express');

module.exports = function(app) {
    const homeController = require('../controllers/home-controller');

    const router = new express.Router();

    router
        .get('/', homeController().loadHomePage);

    app.use('/', router);
};