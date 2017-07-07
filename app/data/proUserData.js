const billa = require('../models/proUser').getProUser(1, 'billa', '1234');

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
                return reject('No user found!');
            } else {
                return resolve(user);
            }
        });
    },
};

module.exports = {
    proUsers
};