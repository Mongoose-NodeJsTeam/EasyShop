/* globals __dirname*/

const fs = require('fs');
const path = require('path');

const attachTo = (app, data) => {
    fs.readdirSync(__dirname)
        .filter((x) => x.includes('-router'))
        .forEach((file) => {
            require(path.join(__dirname, file)).attachTo(app, data);
        });
};

module.exports = { attachTo };