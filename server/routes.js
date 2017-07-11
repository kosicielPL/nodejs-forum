const index = require('../server/routes/index');
const users = require('../server/routes/users');
const settings = require('../server/routes/settings');
const forums = require('../server/routes/forums');
const mobileMenu = require('../server/routes/mobileMenu');
const api = require('../server/routes/api');

module.exports = (app) => {
    app.use('/', index);
    app.use('/users', users);
    app.use('/settings', settings);
    app.use('/forums', forums);
    app.use('/mobilemenu', mobileMenu);
    app.use('/api', api);
};
