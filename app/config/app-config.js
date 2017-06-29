/* globals __dirname */

const express = require('express');
const appConstants = require('constants');
const path = require('path');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../views'));

app.set(express.static('public'));

module.exports = app;
