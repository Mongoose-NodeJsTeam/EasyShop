const uri = require('../models/user').getUser(1, 'uri', '1234', 'boris 3', 'uri@abv.bg');

const usersList = [uri];

const users = {
    findByUsername(username, password) {
        const usernameToLower = username.toLowerCase();
        const user =
            usersList.find((u) =>
            u.username.toLowerCase() === usernameToLower &&
            u.password === password);
        return new Promise((resolve, reject) => {
            if (!user) {
                return reject('No user found!');
            } else {
                return resolve(user);
            }
        });
    },
    findUserById(id) {
        id = parseInt(id, 10);

        const user =
            usersList.find((u) =>
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
    users
};