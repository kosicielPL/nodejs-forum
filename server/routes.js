const index = require('../client/routes/index');
const users = require('../client/routes/users');
const settings = require('../client/routes/settings');
const forums = require('../client/routes/forums');
const mobileMenu = require('../client/routes/mobileMenu');
const api = require('../client/routes/api');

module.exports = (app) => {
    app.use('/', index);
    app.use('/users', users);
    app.use('/settings', settings);
    app.use('/forums', forums);
    app.use('/mobilemenu', mobileMenu);
    app.use('/api', api);
};
