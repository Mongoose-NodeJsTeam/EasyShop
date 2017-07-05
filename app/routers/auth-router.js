const express = require('express');
const passport = require('passport');

module.exports = (app) => {
    const authRouter = new express.Router();

    authRouter
        .get('/sign-in', (req, res) => {
            res.status(200).render('auth/sign-in');
        })
        .post('/sign-in', passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/auth/sign-in',
            failureFlash: true }));

    app.use('/auth', authRouter);
};