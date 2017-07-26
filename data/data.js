const UsersData = require('./usersData');
const ShopsData = require('./shopsData');
const ProductData = require('./productsData');
const TripshopData = require('./tripsShopData');

const init = (db) => {
    return Promise.resolve({
        users: new UsersData(db),
        shops: new ShopsData(db),
        products: new ProductData(db),
        tripshops: new TripshopData(db)
    });
};

module.exports = { init };