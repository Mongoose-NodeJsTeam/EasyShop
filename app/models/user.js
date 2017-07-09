/*globals module*/

class User {
    constructor(id, username, password, address, email) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.address = address;
        this.email = email;
        this.isRegularUser = true;
        this.tripshoop = [];
    }
}
module.exports = {
    getUser(id, username, password, address, email) {
        return new User(id, username, password, address, email);
    }
};
