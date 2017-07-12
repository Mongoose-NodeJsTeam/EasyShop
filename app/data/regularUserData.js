const uri = require('../models/user').getUser(1, 'uri', '1234', 'boris 3', 'uri@abv.bg');
const moni = require('../models/user').getUser(2, 'moni', '1234', 'boris 3', 'uri@abv.bg');
const modelRegularUser = require('../models/user');

const regularUsersList = [uri, moni];

const regularUsers = {
    findRegularUserByUsername(username, password) {
        return new Promise((resolve, reject) => {
            const usernameToLower = username.toLowerCase();
            const reqularUser =
                regularUsersList.find((u) =>
                u.username.toLowerCase() === usernameToLower &&
                u.password === password);

            if (!reqularUser) {
                return reject('No user found!');
            } else {
                return resolve(reqularUser);
            }
        });
    },
    findRegularUserById(id) {
        return new Promise((resolve, reject) => {
            id = parseInt(id, 10);

            const regularUser =
                regularUsersList.find((u) =>
                u.id === id);

            if (!regularUser) {
                return reject('No user found!');
            } else {
                return resolve(regularUser);
            }
        });
    },
    createRegularUser(username, password, address, email){
        return new Promise((resolve, reject) => {
            const id = parseInt(regularUsersList.length + 1, 10);

            const newUser = modelRegularUser.getUser(id, username, password, address, email);

            if (!newUser) {
                return reject('Could not create the regular user');
            } else {
                regularUsersList.push(newUser);

                return resolve(newUser);
            }
        });
    }
};

module.exports = {
    regularUsers
};