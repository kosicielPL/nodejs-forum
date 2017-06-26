const index = require('../client/routes/index');
const users = require('../client/routes/users');

module.exports = (app) => {
    app.use('/', index);
    app.use('/users', users);
};
