const index = require('../client/routes/index');
const users = require('../client/routes/users');
const allForums = require('../client/routes/allForums');
const singleForum = require('../client/routes/singleForum');
const thread = require('../client/routes/thread');

module.exports = (app) => {
    app.use('/', index);
    app.use('/users', users);
    app.use('/forums', allForums);
    app.use('/forums/general', singleForum);
    app.use('/forums/general/generic-thread', thread);
};
