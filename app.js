const express = require('express');
const appConstants = require('./app/common/app-constants');

const app = express();

const userData = require('./app/data/userData');
const shopData = require('./app/data/shopData');

require('./app/config/app-config')(app);
require('./app/config/auth-config-user')(app, userData);
require('./app/config/auth-config-shop')(app, shopData);
require('./app/routers')(app);

app.listen(appConstants.APP_PORT, () => {
        console.log(`Server running at : ${appConstants.APP_PORT}`);
});