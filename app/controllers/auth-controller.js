class AuthController {
    constructor(data) {
        this.data = data;
    }

    getSignUpForm(req, res) {
        return res.render('auth/sign-up-form');
    }

    getSignInForm(req, res) {
        return res.render('auth/sign-in-form');
    }

    signUp(req, res) {
        req.body.isProUser = Boolean(req.body.isProUser);
        const input = req.body;

        this.data.users.findByUsername(input.username)
            .then((user) => {
                if (user) {
                    throw Error('User already exist, choose another username');
                }

                return this.data.users.create(input);
            })
            .then(() => {
                return res.redirect('sign-in');
            });
    }

    signOut(req, res) {
        req.logout();
        return res.redirect('/');
    }
}

const init = (data) => {
    return new AuthController(data);
};

module.exports = { init, };