/* globals __dirname */

const express = require('express');
const path = require('path');
const session = require('express-session');
const flash = require('express-flash');
const favicon = require('serve-favicon');
const fileUpload = require('express-fileupload');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const init = (data, config) => {
    const app = express();

    // view engine setup
    app.set('views', path.join(__dirname, '../views'));
    app.set('view engine', 'pug');

    app.use(favicon(path.join(__dirname, '../../client', 'favicon.ico')));
    app.use(logger('dev'));
    app.use(fileUpload());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true,
    }));
    app.use(cookieParser());
    app.use(flash());
    app.use(session({
        secret: 'zob do grob',
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: true,
        }
    }));
    app.use('/', express.static(
        path.join(__dirname, '../../client')
    ));
    app.use('/lib/', express.static(
        path.join(__dirname, '../../node_modules')
    ));

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
        res.render('error');
    });

    return Promise.resolve(app);
};

module.exports = {
    init,
};
