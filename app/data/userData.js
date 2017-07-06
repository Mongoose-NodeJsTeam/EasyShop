const usersList = [{
    id: 1,
    username: 'jhon',
    password: '123456'
}

];

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