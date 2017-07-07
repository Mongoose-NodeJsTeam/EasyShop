const uri = require('../models/user').getUser(1, 'uri', '1234', 'boris 3', 'uri@abv.bg');
const moni = require('../models/user').getUser(2, 'moni', '1234', 'boris 3', 'uri@abv.bg');

const regularUsersList = [uri, moni];

const regularUsers = {
    findRegularUserByUsername(username, password) {
        const usernameToLower = username.toLowerCase();
        const user =
            regularUsersList.find((u) =>
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
    findRegularUserById(id) {
        id = parseInt(id, 10);

        const user =
            regularUsersList.find((u) =>
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
    regularUsers
};