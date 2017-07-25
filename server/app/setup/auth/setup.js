const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const {
    Strategy,
} = require('passport-local');

const applyTo = (app, data, connectionString) => {
    passport.use(new Strategy((username, password, done) => {
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

    app.use(session({
        secret: 'zob do grob',
        cookie: {
            maxAge: 3600000,
            secure: false,
        },
        store: new MongoStore({
            url: connectionString,
        }),
        resave: true,
        saveUninitialized: true,
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        data.users.getById(id)
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

    // pass user object to all views
    function userView(req, res, next) {
        res.locals.user = req.user;
        next();
    }

    app.use(userView);
};

module.exports = {
    applyTo,
    passport,
};
