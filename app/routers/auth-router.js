const express = require('express');
const passport = require('passport');

module.exports = (app) => {
    const authController = require('../controllers/auth-controller')();

    const authRouter = new express.Router();

    authRouter
        .get('/sign-in', authController.loadSignInPage)
        .post('/sign-in', authController.loginUser)
        .get('/sign-inPro', authController.loadSignInProPage)
        .post('/sign-inPro', authController.loginProUser);

    app.use('/auth', authRouter);
};