/*globals module*/
class User {
    constructor(username, password, adress, email) {
        this.username = username;
        this.password = password;
        this.adress = adress;
        this.tripshoop = [];
        this.email = email;
    }
}
module.exports = User;