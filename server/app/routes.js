module.exports = (app, data, config) => {
    const home = require('./routers/home.router')(app, data, config);
    const users = require('./routers/users.router')(data);
    const settings = require('./routers/settings.router')(data);
    const forums = require('./routers/forums.router')(app, data, config);
    const helpers = require('./routers/helpers.router')(data, config);
    const api = require('./routers/api.router')(data);

    app.use('/', home);
    app.use('/users', users);
    app.use('/settings', settings);
    app.use('/forums', forums);
    app.use('/helpers', helpers);
    app.use('/api', api);
};
