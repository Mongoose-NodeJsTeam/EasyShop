const express = require('express');

module.exports = function (app) {
    const profileController = require('../controllers/profile-controller')();

    const profileRouter = new express.Router();

    profileRouter
        .get('/', profileController.loadProfilePage);
    app.use('/profile', profileRouter);

};