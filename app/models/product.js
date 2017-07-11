class Product {
    constructor(id, name, price, weight ) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.weight = weight;
    }
}

module.exports = {
    getProduct(id, name, price, weight) {
        return new Product(id, name, price, weight);
    }
};