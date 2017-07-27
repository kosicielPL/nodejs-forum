const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const {
    Strategy,
} = require('passport-local');

const applyTo = (app, data, connectionString) => {
    passport.use(new Strategy(async(username, password, done) => {
        const hash = require('../../hasher').init();

        const user = await data.users.findByUsername(username);

        if (user) {
            if (hash.compare(password, user.password)) {
                return done(null, user);
            }
            return done(new Error('Invalid password'));
        }
        return done(new Error('Username \"' + username + '\" username'));
    }));

    app.use(session({
        secret: 'zob do grob',
        cookie: {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
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
