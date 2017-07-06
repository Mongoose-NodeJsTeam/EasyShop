class Product {
    constructor(name, price, category) {
        this.name = name;
        this.price = price;
        this.category = category;
    }

    createPromotion(product, reduction, date) {
        const promoPrice = product.price - product.price * reduction;
        product.isPromotion = true;
        const startDate = date;
        const endDate = startDate + 7;

        return {
            product: product,
            price: promoPrice,
            startDate: startDate,
            endDate: endDate,
        };
    }
}
module.exports = Product;