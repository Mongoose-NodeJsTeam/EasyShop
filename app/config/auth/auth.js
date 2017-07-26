const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cookieParser = require('cookie-parser');

const constant = require('../../utils/app-constants');

const applyTo = (app, data) => {
    passport.use(new LocalStrategy((username, password, done) => {
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
    }));

    app.use(cookieParser(constant.sessionSecret));

    app.use(session({
        store: new MongoStore({ url: constant.connectionString }),
        secret: constant.sessionSecret,
        resave: true,
        saveUninitialized: true
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        data.users.findById(id)
            .then((user) => {
                done(null, user);
            }).catch(done);
    });

    app.use((req, res, next) => {
        res.locals = {
            user: req.user,
        };

        next();
    });
};
module.exports = { applyTo };