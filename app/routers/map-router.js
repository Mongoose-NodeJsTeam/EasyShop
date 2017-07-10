const express = require('express');


module.exports = function(app) {
    const mapController = require('../controllers/map-controller')();

    const mapRouter = new express.Router();

    mapRouter
        .get('/', mapController.loadMapPage);

    app.use('/map', mapRouter);
};