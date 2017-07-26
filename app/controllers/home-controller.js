class HomeController {
    constructor(data) {
        this.data = data;
    }

    loadHomePage(req, res) {
        if (!req.isAuthenticated()) {
            res.render('homePage', {});
        } else {
            res.status(200)
                .render('homePage', {
                    user: req.user
                });
        }
    }
}

const init = (data) => {
    return new HomeController(data);
};

module.exports = { init, };