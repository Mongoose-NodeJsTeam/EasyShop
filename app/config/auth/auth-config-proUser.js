const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const session = require('express-session');

const configAuthProUser = (app, data) => {
    app.use(cookieParser());
    app.use(session({ secret: 'Purple Unicorn'}));
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use('proUser', new LocalStrategy(
        (username, password, done) => {
            data.proUsers.findProUserByUsername(username, password)
                .then((proUser) => {
                    return done(null, proUser);
                })
                .catch((err) => {
                    return done(err);
                });

            passport.serializeUser((proUser, done) => {
                done(null, proUser.id);
            });

            passport.deserializeUser(function (id, done) {
                return data.proUsers.findProUserById(id)
                    .then((proUser) => {
                        done(null, proUser);
                    })
                    .catch(done);
            });
        }
    ));
};

module.exports = configAuthProUser;