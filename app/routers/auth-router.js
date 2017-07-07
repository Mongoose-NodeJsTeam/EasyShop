const express = require('express');
const passport = require('passport');

module.exports = (app) => {
    const authController = require('../controllers/auth-controller')();

    const authRouter = new express.Router();

    authRouter
        .get('/sign-in-options', authController.loadSignInOptions)
        .get('/sign-in-regularUser', authController.loadSignInRegularUserForm)
        .post('/sign-in-regularUser', authController.loginUser)
        .get('/sign-in-proUser', authController.loadSignInProUserForm)
        .post('/sign-in-proUser', authController.loginProUser);

    app.use('/auth', authRouter);
};