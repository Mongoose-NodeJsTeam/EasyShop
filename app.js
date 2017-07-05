const express = require('express');
const appConstants = require('./app/common/app-constants');

const app = express();

require('./app/config/app-config')(app);
require('./app/routers')(app);

app.listen(appConstants.APP_PORT, () => {
        console.log(`Server running at : ${appConstants.APP_PORT}`);
});