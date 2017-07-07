const express = require('express');
const appConstants = require('./app/common/app-constants');

const app = express();

const userData = require('./app/data/regularUserData');
const proUserData = require('./app/data/proUserData');

require('./app/config/app-config')(app);
require('./app/config/auth/auth-config-regularUser')(app, userData);
require('./app/config/auth/auth-config-proUser')(app, proUserData);
require('./app/routers')(app);

app.listen(appConstants.APP_PORT, () => {
        console.log(`Server running at : ${appConstants.APP_PORT}`);
});