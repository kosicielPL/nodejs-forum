/* globals __dirname */

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const fileUpload = require('express-fileupload');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const applyTo = (app, config) => {
    // view engine setup
    app.set('views', path.join(__dirname, '../../../views'));
    app.set('view engine', 'pug');

    app.use(favicon(path.join(__dirname, '../../../../client', 'favicon.ico')));
    app.use(logger('dev'));
    app.use(fileUpload());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true,
    }));
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
