class HomeController {
    constructor(data) {
        this.data = data;
    }

    loadHomePage(req, res) {
        if (!req.isAuthenticated()) {
            return res.render('homePage', {});
        }

        return res.status(200)
            .render('homePage', {
                user: req.user
            });
    }

    loadProfilePage(req, res) {
        if (!req.isAuthenticated()) {
            return res.redirect('/auth/sign-in');
        }

        return res.status(200)
            .render('profilePage', {
                user: req.user
            });
    }
}

const init = (data) => {
    return new HomeController(data);
};

module.exports = { init };