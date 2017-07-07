const passport = require('passport');

module.exports = function() {
    return {
        loadSignInOptions(req, res) {
            res.status(200).render('auth/sign-in-options');
        },
        logout(req, res) {
            return Promise.resolve()
                .then(() => {
                    if (!req.isAuthenticated()) {
                        res.redirect('/');
                    } else {
                        req.logout();
                        req.session.destroy();
                        res.redirect('/');
                    }
                });
        },
    };
};
