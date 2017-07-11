module.exports = (app, data) => {
    const home = require('./routers/home.router')(app, data);
    const users = require('./routers/users.router')(app, data);
    const settings = require('./routers/settings.router')(app, data);
    const forums = require('./routers/forums.router')(app, data);
    const mobileMenu = require('./routers/mobileMenu.router')(app, data);
    const api = require('./routers/api.router')(app, data);

    app.use('/', home);
    app.use('/users', users);
    app.use('/settings', settings);
    app.use('/forums', forums);
    app.use('/mobilemenu', mobileMenu);
    app.use('/api', api);
};
