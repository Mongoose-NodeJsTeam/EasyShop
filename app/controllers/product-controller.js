class ProductController {
    constructor(data) {
        this.data = data;
    }

    loadProductForm(req, res) {
        const shopId = req.params.id;

        this.data.shops.findById(shopId)
            .then((shop) => {
                res.status(200)
                    .render('product/addNewProduct', {
                        shop: shop
                    });
            });
    }

    createProductForShop(req, res) {
        const shopId = req.params.id;

        const productData = req.body;

        const product = this.data.
            products.createNewProduct(shopId, productData);

        this.data.shops.assignProductToShop(shopId, product)
            .then(() => {
                res.redirect('/shop/' + shopId);
            });
    }

    loadProductInfo(req, res) {
        const productId = req.params.productId;

        this.data.products.findById(productId)
            .then((product) => {
                return res.send({
                    product: product
                });
            });
    }

    updateProduct(req, res) {
        const productEditData = req.body;
        const productId = req.params.productId;
        const shopId = req.params.id;

        return Promise.all([
            this.data.products.updateProductById(productId, productEditData),
            this.data.shops.updateProductInShop(shopId, productId, productEditData)
        ])
            .then(() => {
                return res.redirect('/shop/' + shopId);
            });
    }

    deleteProduct(req, res) {
        const productId = req.params.productId;
        const shopId = req.params.id;

        return Promise.all([
            this.data.products.deleteById(productId),
            this.data.shops.deleteProductFromShop(shopId, productId)
        ])
            .then(() => {
                return res.redirect('/shop/' + shopId);
            });
    }
}

const init = (data) => {
    return new ProductController(data);
};

module.exports = { init };