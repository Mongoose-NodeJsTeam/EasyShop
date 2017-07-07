/*globals module*/

class User {
    constructor(id, username, password, address, email) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.address = address;
        this.tripshoop = [];
        this.email = email;
        this.isRegularUser = true;
    }
}
module.exports = {
    getUser(id, username, password, address, email) {
        return new User(id, username, password, address, email);
    }
};
