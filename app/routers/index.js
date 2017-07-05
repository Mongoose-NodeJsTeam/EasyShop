/* globals __dirname*/

const fs = require('fs');
const path = require('path');

module.exports = function(app) {
    fs.readdirSync(__dirname)
        .filter((x) => x.includes('-router'))
        .forEach((file) => {
            require(path.join(__dirname, file))(app);
        });
};
