const express = require('express');
const passport = require('passport');

module.exports = (app) => {
    const authController = require('../controllers/auth-controller')();

    const authRouter = new express.Router();

    authRouter
        .get('/sign-in', authController.loadSignInPage)
        .post('/sign-in', authController.loginUser);

    app.use('/auth', authRouter);
};