const express = require('express');

const init = (data) => {
    const app = express();

    require('./config/auth').applyTo(app, data);
    require('./config/app').applyTo(app);

    require('./routers')
        .attachTo(app, data);

    return Promise.resolve(app);
};

module.exports = { init };