const passport = require('passport');

module.exports = function () {
    return {
        loadSignInPage(req, res) {
            res.status(200).render('auth/sign-in');
        },
        loginUser(req, res, next) {
            const auth = passport.authenticate('user', function (error, user) {
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

                req.login(user, error => {
                    if (error) {
                        next(error);
                        return;
                    }

                    res.redirect('/');
                });
            });

            return Promise.resolve()
                .then(() => {
                    if (!req.isAuthenticated()) {
                        auth(req, res, next);
                    } else {
                        res.redirect('/');
                    }
                });
        },
        loadSignInProPage(req, res) {
            res.status(200).render('auth/sign-inPro');
        },
        loginProUser(req, res, next) {
            const auth = passport.authenticate('shop', function (error, user) {
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

                req.login(user, error => {
                    if (error) {
                        next(error);
                        return;
                    }

                    res.redirect('/');
                });
            });

            return Promise.resolve()
                .then(() => {
                    if (!req.isAuthenticated()) {
                        auth(req, res, next);
                    } else {
                        res.redirect('/');
                    }
                });
        }
    };
};

