const billa = require('../models/proUser').getProUser(1, 'billa', '1234');
const modelProUser = require('../models/proUser');
const modelShop = require('../models/shop');

const proUsersList = [billa];

const proUsers = {
    findProUserByUsername(username, password) {
        const usernameToLower = username.toLowerCase();
        const proUser =
            proUsersList.find((u) =>
            u.username.toLowerCase() === usernameToLower &&
            u.password === password);

        return new Promise((resolve, reject) => {
            if (!proUser) {
                return reject('No pro user found!');
            } else {
                return resolve(proUser);
            }
        });
    },
    findProUserById(id) {
        id = parseInt(id, 10);

        const user =
            proUsersList.find((u) =>
            u.id === id);

        return new Promise((resolve, reject) => {
            if (!user) {
                return reject('No pro user found!');
            } else {
                return resolve(user);
            }
        });
    },
    createProUser(username, password, email){
        const id = parseInt(proUsersList.length + 1, 10);

        const newProUser = modelProUser.getProUser(id, username, password, email);

        return new Promise((resolve, reject) => {
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
        const proUserToAssignShop = this.findProUserById(proUserId)
            .then((proUser) => {
                const newShop = modelShop.getShop(4, name, address, email, mobile, description);

                return new Promise((resolve, reject) => {
                    proUser.shops.push(newShop);
                    resolve(proUser);
                });
            });
    }
};

module.exports = {
    proUsers
};