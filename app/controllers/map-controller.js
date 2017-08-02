class MapController {
    constructor(data) {
        this.data = data;
    }

    loadMapPage(req, res) {
        if (!req.isAuthenticated()) {
           return res.redirect('map/nonAuthMap');
        }

        return res.render('map/mapPage');
    }

    loadNonAuthMap(req, res) {
        return Promise.all([
            this.data.shops.getAll(),
            this.data.tripshops.getAll()
        ])
            .then(([shops, tripshops]) => {
                return res.render('map/nonAuthMap', {
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

module.exports = { init };
