const uri = require('../models/user').getUser(1, 'uri', '1234', 'boris 3', 'uri@abv.bg');
const moni = require('../models/user').getUser(2, 'moni', '1234', 'boris 3', 'uri@abv.bg');
const modelRegularUser = require('../models/user');

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
    createRegularUser(username, password, address, email){
        const id = parseInt(regularUsersList.length + 1, 10);

        console.log(modelRegularUser);
        const newUser = modelRegularUser.getUser(id, username, password, address, email);

        return new Promise((resolve, reject) => {
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