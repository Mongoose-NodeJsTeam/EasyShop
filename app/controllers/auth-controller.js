const passport = require('passport');

class AuthController {
    constructor(data) {
        this.data = data;
    }

    getSignUpForm(req, res) {
        if (req.isAuthenticated()) {
            return res.render('homePage', {
                user: req.user
            });
        }

        return res.render('auth/sign-up-form');
    }

    getSignInForm(req, res) {
        if (req.isAuthenticated()) {
            return res.render('homePage', {
                user: req.user
            });
        }

        return res.render('auth/sign-in-form');
    }

    signIn(req, res, next) {
        const auth = passport.authenticate('local', (error, user) => {
            if (error) {
                req.flash('error', error);
                return res.render('auth/sign-in-form');
            }

            if (!user) {
                req.flash('error', error);
                return res.render('auth/sign-in-form');
            }

            req.login(user, (e) => {
                if (e) {
                    next(e);
                    return;
                }

                req.flash('success', 'Login successful!');
                res.redirect('/');
                return;
            });
        });

        auth(req, res, next);
    }


    signUp(req, res) {
        req.body.isProUser = Boolean(req.body.isProUser);
        const input = req.body;

        return Promise.all([
            this.data.users.findByUsername(input.username),
            this.data.users.checkIfEmailAlreadyExists(input.email)
        ])
            .then(([foundUserbyUsername]) => {
                if (foundUserbyUsername) {
                    throw Error('User already exist, choose another username');
                }

                this.data.users.create(input);
            })
            .then(() => {
                req.flash('success', 'Signed up successful! Please sign in!');
                res.redirect('sign-in');
            })
            .catch((err) => {
                req.flash('error', err.message);
                res.redirect(req.get('referer'));
            });
    }

    signOut(req, res) {
        req.logout();
        req.flash('success', 'Logout successful!');
        return res.redirect('/');
    }
}

const init = (data) => {
    return new AuthController(data);
};

module.exports = { init };