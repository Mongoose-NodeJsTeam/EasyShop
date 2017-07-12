const billa = require('../models/proUser').getProUser(1, 'billa', '1234');
const modelProUser = require('../models/proUser');
const modelShop = require('../models/shop');
const modelProduct = require('../models/product');

const proUsersList = [billa];

const proUsers = {
    findProUserByUsername(username, password) {
        return new Promise((resolve, reject) => {
            const usernameToLower = username.toLowerCase();
            const proUser =
                proUsersList.find((u) =>
                u.username.toLowerCase() === usernameToLower &&
                u.password === password);

            if (!proUser) {
                return reject('No pro user found!');
            } else {
                return resolve(proUser);
            }
        });
    },
    findProUserById(id) {
        return new Promise((resolve, reject) => {
            id = parseInt(id, 10);

            const proUser =
                proUsersList.find((u) =>
                u.id === id);

            if (!proUser) {
                return reject('No pro user found!');
            } else {
                return resolve(proUser);
            }
        });
    },
    findShopById(proUserId, shopId) {
        return new Promise((resolve, reject) => {
            proUserId = parseInt(proUserId, 10);
            shopId = parseInt(shopId, 10);

            this.findProUserById(proUserId)
                .then((proUser) => {
                    const shop =
                        proUser.shops.find((u) =>
                        u.id === shopId);

                    if (!shop) {
                        return reject('Shop with provided id was not found!');
                    } else {
                        return resolve(shop);
                    }
                });
        });
    },
    findProductById(proUserId, shopId, productId) {
        return new Promise((resolve, reject) => {
            proUserId = parseInt(proUserId, 10);
            shopId = parseInt(shopId, 10);
            productId = parseInt(productId, 10);

            this.findShopById(proUserId, shopId)
                .then((shop) => {
                    const product =
                        shop.products.find((p) =>
                        p.id === productId);

                    if (!product) {
                        return reject('Product with provided id was not found!');
                    } else {
                        return resolve(product);
                    }
                });
        });
    },
    createProUser(username, password, email)
    {
        return new Promise((resolve, reject) => {
            const id = parseInt(proUsersList.length + 1, 10);

            const newProUser = modelProUser.getProUser(id, username, password, email);

            if (!newProUser) {
                return reject('Could not create the pro user');
            } else {
                proUsersList.push(newProUser);
                console.log(proUsersList);
                return resolve(newProUser);
            }
        });
    },
    addNewShop(proUserId, name, address, email, mobile, description) {
        this.findProUserById(proUserId)
            .then((proUser) => {
                const newShopId = proUser.shops.length + 1;

                const newShop = modelShop.getShop(newShopId, name, address, email, mobile, description);

                return new Promise((resolve, reject) => {
                    proUser.shops.push(newShop);
                    resolve(proUser);
                });
            });
    },
    addNewProduct(proUserId, shopId, name, price, weight) {
        this.findProUserById(proUserId)
            .then((proUser) => {
                this.findShopById(proUser.id, shopId)
                    .then((shop) => {
                        const newProductId = shop.products.length + 1;

                        const newProduct = modelProduct.getProduct(newProductId, name, price, weight);

                        return new Promise((resolve, reject) => {
                            shop.products.push(newProduct);
                            resolve(shop);
                        });
                    });
            });
    },
    deleteProductById(proUserId, shopId, productId) {
        return new Promise((resolve, reject) => {
            this.findProUserById(proUserId)
                .then((proUser) => {
                    this.findShopById(proUser.id, shopId)
                        .then((shop) => {
                            this.findProductById(proUserId, shopId, productId)
                                .then((product) => {
                                    const indexOfProduct = shop.products.indexOf(product);

                                    shop.products.splice(indexOfProduct, 1);

                                    return resolve(product);
                                });
                        });
                });
        });
    }
};


module.exports = {
    proUsers
};