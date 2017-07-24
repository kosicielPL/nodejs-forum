const session = require('express-session');
const passport = require('passport');
const {
    Strategy,
} = require('passport-local');

const applyTo = (app, data) => {
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
        resave: true,
        saveUninitialized: true,
        // cookie: {
        //     secure: true,
        // },
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
};

module.exports = {
    applyTo,
    passport,
};
