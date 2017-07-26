class BasketController {
    constructor(data) {
        this.data = data;
    }

    loadBasketPage(req, res) {
        const user = req.user;
        const products = (req.body);

        const arr=[];

        for (const key in products) {
            if (products.hasOwnProperty(key)) {
                const item =JSON.parse(products[key]);

                const prod=(item);
                arr.push((prod));
            }
        }


        res.render('basket', {
            products: arr,
            user:user
        });
    }

    addProductToBasket(req, res) {
        console.log(req.body.product + 'aideee');
        console.log(req.body.name + 'aideeddedee');
        res.send('successuflly added');

        //initialize basket property user,update
        // add productto basket
    }
}

const init = (data) => {
    return new BasketController(data);
};

module.exports = { init };