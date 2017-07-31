const request = require('supertest');
const http = require('http');
const config = require('../../../server/config');

describe('search routing', () => {
    let app = null;
    let server = null;

    before(() => {
        process.env.NODE_ENV = 'test';
        let connectionString = 'mongodb://';

        if (config.database.password.length > 0 &&
            config.database.username.length > 0) {
            connectionString +=
                config.database.username +
                ':' +
                config.database.password +
                '@';
        }

        connectionString +=
            config.database.host +
            ':' +
            config.database.port +
            '/' +
            config.database.dbName;
        return Promise.resolve()
            .then(() => require('../../../db').init(connectionString))
            .then((db) => require('../../../data').init(db))
            .then((data) => require('../../../server/app')
                .init(data, config.options, connectionString))
            .then((_app) => {
                app = _app;
                server = http.createServer(app);
                require('../../../server/socketio')
                    .init(server)
                    .then((io) => {
                        app.io = io;
                        return Promise.resolve();
                    });
            });
    });

    after(() => {
        server.close();
        server = null;
        app = null;
    });
    describe('GET /search', () => {
        it('/search without login', (done) => {
            request(server)
                .get('/search')
                .expect(302)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
        it('/search logged in', (done) => {
            request(server)
                .get('/search')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
        it('/search/:title when valid :title', (done) => {
            request(server)
                .get('/search/test')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });
    describe('GET and expect 404', () => {
        it('/search/:title when invalid :title', (done) => {
            request(server)
                .get('/search/asdasdasdf')
                .expect(404)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });
});
