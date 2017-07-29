class MapController {
    constructor(data) {
        this.data = data;
    }

    loadMapPage(req, res) {
        if (!req.isAuthenticated()) {
            res.redirect('map/nonAuthMap');
        }

        res.render('map/mapPage');
    }

    loadNonAuthMap(req, res) {
        Promise.all([
            this.data.shops.getAll(),
            this.data.tripshops.getAll()
        ])
            .then(([shops, tripshops]) => {
                res.render('map/nonAuthMap', {
                    shops: shops,
                    tripshops: tripshops
                });
            });
    }

    loadAuthMapData(req, res) {
        Promise.all([
            this.data.shops.getAll(),
            this.data.users.findAllUsersWithTripShops()
        ])
            .then(([shops, users]) => {
                res.send({
                    shops: shops,
                    users: users
                });
            });
    }
}

const init = (data) => {
    return new MapController(data);
};

module.exports = {init};
