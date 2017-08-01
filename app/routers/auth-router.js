const express = require('express');

const attachTo = (app, data) => {
    const authRouter = new express.Router();
    const authController = require('../controllers/auth-controller').init(data);

    authRouter
        .get('/sign-up', authController.getSignUpForm)
        .post('/sign-up', authController.signUp.bind(authController))
        .get('/sign-in', authController.getSignInForm)
        .post('/sign-in', authController.signIn)
        .get('/logout', authController.signOut);

    app.use('/auth', authRouter);
};

module.exports = { attachTo };