const shopList = [{
    id: 1,
    username: 'Bila',
    password: 'aideee'
}

];

const shops = {
    findByUsername(username, password) {
        const usernameToLower = username.toLowerCase();
        const user =
            shopList.find((u) =>
                u.username.toLowerCase() === usernameToLower &&
                u.password === password
            )
        ;
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
            shopList.find((u) =>
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
    shops
};