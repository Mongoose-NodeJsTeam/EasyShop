const express = require('express');

module.exports = function (app) {
    const signUpController = require('../controllers/sign-up/sign-up-controller')();

    const signUpRouter = new express.Router();

    signUpRouter
        .get('/sign-up-options', signUpController.loadSignUpOptions)
        .get('/sign-up-regularUser', signUpController.loadSignUpRegularUserForm)
        .get('/sign-up-proUser', signUpController.loadSignUpProUserForm)
        .post('/sign-up-proUser', signUpController.signUpNewProUser)
        .post('/sign-up-regularUser', signUpController.signUpNewRegularUser);


    app.use('/sign-up', signUpRouter);


};