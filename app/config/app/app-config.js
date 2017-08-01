/* globals __dirname */


const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const applyTo = (app) => {
    app.set('view engine', 'pug');
    app.set('views', path.join(__dirname, '../../views'));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    const libsPath = path.join(__dirname, '../../../node_modules');
    app.use('/libs', express.static(libsPath));

    const publicPath = path.join(__dirname, '../../../public');
    app.use('/public', express.static(publicPath));

    app.use((req, res, next) => {
        res.locals.messages = require('express-messages')(req, res);
        next();
    });
    app.use(require('connect-flash')());
};

module.exports = { applyTo };
