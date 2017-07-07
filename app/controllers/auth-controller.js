const passport = require('passport');

module.exports = function() {
    return {
        loadSignInOptions(req, res) {
            res.status(200).render('auth/sign-in-options');
        },
        loadSignInRegularUserForm(req, res) {
            res.status(200).render('auth/sign-in-regularUser');
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
        loadSignInProUserForm(req, res) {
            res.status(200).render('auth/sign-in-proUser');
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

