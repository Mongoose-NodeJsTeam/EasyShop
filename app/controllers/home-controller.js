module.exports = function() {
    return {
        loadHomePage(req, res) {
            return Promise.resolve()
                .then(() => {
                    if (!req.isAuthenticated()) {
                        res.render('homePage', {});
                    } else {
                        res.status(200)
                            .render('homePage', {
                                user: req.user
                            });
                    }
                });
        }
    };
};