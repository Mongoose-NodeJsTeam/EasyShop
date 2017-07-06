const express = require('express');
const appConstants = require('./app/common/app-constants');

const app = express();

const data1 = require('./app/data/userData');
const data2 = require('./app/data/shopData');

require('./app/config/app-config')(app);
require('./app/config/auth-config-user')(app, data1);
require('./app/config/auth-config-shop')(app, data2);
require('./app/routers')(app);

app.listen(appConstants.APP_PORT, () => {
        console.log(`Server running at : ${appConstants.APP_PORT}`);
});