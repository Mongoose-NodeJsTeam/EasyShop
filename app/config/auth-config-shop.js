const passport = require('passport');
const Strategy = require('passport-local');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const configAuthShop = (app, data) => {
    app.use(cookieParser());
    app.use(session({secret: 'Purple Unicorn'}));
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use('shop', new Strategy(
        (username, password, done) => {
            data.shops.findByUsername(username,password)
                .then((user) => {
                    return done(null, user);
                })
                .catch((err) => {
                    return done(err);
                });

            passport.serializeUser((user, done) => {
                done(null, user.id);
            });

            passport.deserializeUser(function (id, done) {
                return data.shops.findUserById(id)
                    .then((user) => {
                        done(null, user);
                    })
                    .catch(done);
            });
        }
    ));
};

module.exports = configAuthShop;