module.exports = (app, data, config) => {
    const home = require('./routers/home.router')(app, data, config);
    const auth = require('./routers/auth.router')(data, config.users);
    const users = require('./routers/users.router')(data);
    const settings = require('./routers/settings.router')(data);
    const forums = require('./routers/forums.router')(app, data, config);
    const search = require('./routers/search.router')(app, data, config);
    const helpers = require('./routers/helpers.router')(data, config);
    const about = require('./routers/about.router')(data);

    app.use('/', home);
    app.use('/', auth);
    app.use('/users', users);
    app.use('/settings', settings);
    app.use('/forums', forums);
    app.use('/search', search);
    app.use('/helpers', helpers);
    app.use('/about', about);
};
