/* globals __dirname */

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const configApp = (app) => {
    app.set('view engine', 'pug');
    app.set('views', path.join(__dirname, '../views'));
	
	app.use(bodyParser.urlencoded({ extended: false }));

    app.use('/libs', express.static(path.join(__dirname, '../../node_modules')));

    app.use('/public', express.static(path.join(__dirname, '../../public')));
};

module.exports = configApp;
