const app = require('./app/config/app-config');
const appConstants = require('./app/common/app-constants');

require('./app/routers')(app);

app.listen(appConstants.APP_PORT, () => {
        console.log(`Server running at : ${appConstants.APP_PORT}`);
});