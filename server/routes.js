const index = require('../client/routes/index');
const users = require('../client/routes/users');
const forums = require('../client/routes/forums');
const api = require('../client/routes/api');

module.exports = (app) => {
    app.use('/', index);
    app.use('/users', users);
    app.use('/forums', forums);
    app.use('/api', api);
};
