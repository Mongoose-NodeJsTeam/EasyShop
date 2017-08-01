const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');

const applyTo = (passport, data) => {
    const localStrategy = new LocalStrategy((username, password, done) => {
        data.users.checkPassword(username, password)
            .then(() => {
                return data.users.findByUsername(username);
            })
            .then((user) => {
                done(null, user);
            })
            .catch((err) => {
                done(err);
            });
    });

    passport.use(localStrategy);
};

module.exports = { applyTo };
