const passport = require('passport');

module.exports = function() {
    return {
        loadSignInProUserForm(req, res) {
            res.status(200).render('auth/sign-in-proUser');
        },
        loginProUser(req, res, next) {
            const auth = passport.authenticate('proUser', function (error, user) {
                if (error) {
                    next(error);
                    return;
                }

                if (!user) {
                    res.status(400);
                    res.json({
                        success: false,
                        message: 'Invalid name or password!'
                    });
                }

                req.logIn(user, error => {
                    if (error) {
                        next(error);
                        return;
                    }

                    res.redirect('/shop/my-shops');
                });
            });

            return Promise.resolve()
                .then(() => {
                    if (!req.isAuthenticated()) {
                        auth(req, res, next);
                    } else {
                        res.redirect('/shop/my-shops');
                    }
                });
        }
    };
};

