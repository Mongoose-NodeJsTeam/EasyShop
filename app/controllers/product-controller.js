class ProductController {
    constructor(data) {
        this.data = data;
    }

    loadProductForm(req, res) {
        if (!req.isAuthenticated()) {
            return res.redirect('/auth/sign-in');
        }

        if (!req.user.isProUser) {
            return res.render('unauthorized');
        }

        const shopId = req.params.id;

        return this.data.shops.findById(shopId)
            .then((shop) => {
                res.status(200)
                    .render('product/addNewProduct', {
                        shop: shop
                    });
            });
    }

    createProduct(req, res) {
        if (!req.isAuthenticated()) {
            return res.redirect('/auth/sign-in');
        }

        if (!req.user.isProUser) {
            return res.render('unauthorized');
        }

        const shopId = req.params.id;
        const productData = req.body;
        productData.shopId = shopId;

        return this.data.products.create(productData)
            .then((product) => {
                this.data.shops.assignProductToShop(shopId, product)
                    .then(() => {
                        req.flash('success', 'Product successfully added!');
                        res.redirect('/shop/' + shopId);
                    });
            })
            .catch((err) => {
                req.flash('error', err);
                res.redirect('/shop/' + shopId + '/add-product');
            });
    }

    loadProductInfo(req, res) {
        const productId = req.params.productId;

        return this.data.products.findById(productId)
            .then((product) => {
                return res.send({
                    product: product
                });
            });
    }

    updateProduct(req, res) {
        if (!req.isAuthenticated()) {
            return res.redirect('/auth/sign-in');
        }

        if (!req.user.isProUser) {
            return res.render('unauthorized');
        }

        const productEditData = req.body;
        const productId = req.params.productId;
        const shopId = req.params.id;

        return Promise.all([
            this.data.products.updateProductById(productId, productEditData),
            this.data.shops.updateProductInShop(
                shopId,
                productId,
                productEditData)
        ])
            .then(() => {
                req.flash(
                    'success',
                    'Product successfully updated!');

                return res.send({
                    locationUrl: '/shop/' + shopId
                });
            })
            .catch((err) => {
                req.flash('error', err);
                return res.send({
                    locationUrl: '/shop/' + shopId
                });
            });
    }

    deleteProduct(req, res) {
        if (!req.isAuthenticated()) {
            return res.redirect('/auth/sign-in');
        }

        if (!req.user.isProUser) {
            return res.render('unauthorized');
        }

        const productId = req.params.productId;
        const shopId = req.params.id;

        return Promise.all([
            this.data.products.deleteById(productId),
            this.data.shops.deleteProductFromShop(shopId, productId)
        ])
            .then(() => {
                req.flash(
                    'success',
                    'Product successfully deleted!');

                return res.send({
                    locationUrl: '/shop/' + shopId
                });
            })
            .catch((err) => {
                req.flash('error', err);
                return res.send({
                    locationUrl: '/shop/' + shopId
                });
            });
    }
}

const init = (data) => {
    return new ProductController(data);
};

module.exports = { init };