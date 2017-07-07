const express = require('express');
const passport = require('passport');

module.exports = (app) => {
    const authController = require('../controllers/auth/auth-controller')();
    const authRegularUserController = require('../controllers/auth/auth-regularUser-controller')();
    const authProUserController = require('../controllers/auth/auth-proUser-controller')();

    const authRouter = new express.Router();

    authRouter
        .get('/sign-in-options', authController.loadSignInOptions)
        .get('/sign-in-regularUser', authRegularUserController.loadSignInRegularUserForm)
        .post('/sign-in-regularUser', authRegularUserController.loginRegularUser)
        .get('/sign-in-proUser', authProUserController.loadSignInProUserForm)
        .post('/sign-in-proUser', authProUserController.loginProUser)
        .get('/logout-proUser', authProUserController.logout)
        .get('/logout-regularUser', authRegularUserController.logout);

    app.use('/auth', authRouter);
};