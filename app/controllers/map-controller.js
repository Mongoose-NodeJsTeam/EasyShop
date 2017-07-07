module.exports = function() {
    return {
        loadMap(req, res) {
            return Promise.resolve()
                .then(() => {
                    if (!req.isAuthenticated()) {
                        res.render('mapPage', {});
                    } else {
                        res.status(200)
                            .render('mapPage', {
                                user: req.user
                            });
                    }
                });
        }
    };
};
