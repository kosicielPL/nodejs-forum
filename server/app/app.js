const express = require('express');

const init = (data, config, connectionString) => {
    const app = express();

    require('./setup/auth').applyTo(app, data, connectionString);
    require('./setup/app').applyTo(app, config);
    require('./routes.js')(app, data, config);

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        const err = new Error('Page not found');
        err.status = 404;
        next(err);
    });

    app.use(function(err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {},
        });
    });

    return Promise.resolve(app);
};

module.exports = {
    init,
};
