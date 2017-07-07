class ProUser {
    constructor(id, username, password) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.isRegularUser = false;
        this.shops = [];
    }
}

module.exports = {
    getProUser(id, username, password) {
        return new ProUser(id, username, password);
    }
};
