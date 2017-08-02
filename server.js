const async = () => {
    return Promise.resolve();
};

const constants = require('./app/utils/app-constants');

async()
    .then(() => require('./db').init(constants.connectionString))
    .then((db) => require('./data').init(db))
    .then((data) => require('./app').init(data))
    .then((app) => {
        app.listen(process.env.PORT || constants.appPort, () =>
            console.log(`Server running at : ${constants.appPort}`));
    })
    .catch((err) => {
        console.log(err);
    });