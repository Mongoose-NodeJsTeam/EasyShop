class ProUser {
    constructor(id, username, password, email) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.isRegularUser = false;
        this.shops = [];
    }
}

module.exports = {
    getProUser(id, username, password, email) {
        return new ProUser(id, username, password, email);
    }
};
