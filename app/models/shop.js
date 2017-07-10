class Shop {
    constructor(id, name, address, email, mobile, description) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.email = email;
        this.mobile = mobile;
        this.description = description;
        this.products = [];
    }
}

module.exports = {
    getShop(id, name, address, email, mobile, description) {
        return new Shop(id, name, address, email, mobile, description);
    }
};