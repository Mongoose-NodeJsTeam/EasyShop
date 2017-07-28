const express = require('express');


const attachTo = (app, data) => {
    const mapController = require('../controllers/map-controller').init(data);

    const mapRouter = new express.Router();

    mapRouter
        .get('/loadAuthMapData', mapController.loadAuthMapData.bind(mapController))
        .get('/nonAuthMap', mapController.loadNonAuthMap.bind(mapController))
        .get('/', mapController.loadMapPage);

    app.use('/map', mapRouter);
};

module.exports = { attachTo };