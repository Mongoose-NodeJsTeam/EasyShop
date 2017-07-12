const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const session = require('express-session');

const configAuthRegularUser = (app, data) => {
    app.use(cookieParser());
    app.use(session({ secret: 'Bla' }));
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use('regularUser', new LocalStrategy(
        (username, password, done) => {
            data.regularUsers.findRegularUserByUsername(username, password)
                .then((user) => {
                    return done(null, user);
                })
                .catch((err) => {
                    return done(err);
                });

            passport.serializeUser((user, done) => {
                done(null, user.id);
            });

            passport.deserializeUser(function(id, done) {
                return data.regularUsers.findRegularUserById(id)
                    .then((user) => {
                        done(null, user);
                    })
                    .catch(done);
            });
        }
    ));
};

module.exports = configAuthRegularUser;