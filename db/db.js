const MongoClient = require('mongodb').MongoClient;

const init = (coonnectionString) => {
    return MongoClient.connect(coonnectionString)
        .then((db) => {
            console.log('Connection established');
            return db;
        });
};

module.exports = { init };