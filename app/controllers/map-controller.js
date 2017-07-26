class MapController {
    constructor(data) {
        this.data = data;
    }

    loadMapPage(req, res) {
        if (!req.isAuthenticated()) {
            res.render('mapPage', {});
        } else {
            res.render('mapPage', {
                    user: req.user
                });
        }
    }
}

const init = (data) => {
    return new MapController(data);
};

module.exports = { init, };
