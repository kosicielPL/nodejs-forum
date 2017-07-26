/* globals __dirname */

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const fileUpload = require('express-fileupload');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const colors = require('colors');

const applyTo = (app, config) => {
    // view engine setup
    app.set('views', path.join(__dirname, '../../../views'));
    app.set('view engine', 'pug');

    logger.token('user', function getUser(req) {
        return (req.user ? req.user.username : 'Annonymous');
    });

    app.use(logger(
        ':user'.yellow +
        ' @ ' +
        ':remote-addr'.gray +
        ' -> ' +
        ':method'.magenta +
        ' ' +
        ':url'.gray +
        ' ' +
        ':status'.yellow +
        ' in '.gray +
        ':response-time ms'));

    app.use(favicon(path.join(__dirname, '../../../../client', 'favicon.ico')));
    app.use(fileUpload());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true,
    }));
    app.use(helmet());
    app.disable('x-powered-by');
    // app.use(helmet.noCache());
    app.use(helmet.frameguard());
    app.use(helmet.xssFilter());
    app.use(cookieParser());
    app.use('/', express.static(
        path.join(__dirname, '../../../../client')
    ));
    app.use('/lib/', express.static(
        path.join(__dirname, '../../../../node_modules')
    ));

    app.use(require('connect-flash')());

    // pass config and flash objects to all views
    app.use((req, res, next) => {
        res.locals.config = req.config;
        next();
    });

    app.use((req, res, next) => {
        res.locals.messages = require('express-messages')(req, res);
        next();
    });
};

module.exports = {
    applyTo,
};
