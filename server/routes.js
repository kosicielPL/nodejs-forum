const index = require('../client/routes/index');
const users = require('../client/routes/users');
const forum = require('../client/routes/forum');

module.exports = (app) => {
    app.use('/', index);
    app.use('/users', users);
    app.use('/forum', forum);
};
