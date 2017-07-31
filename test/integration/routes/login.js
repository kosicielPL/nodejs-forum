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
    describe('GET /login', () => {
        it('expect to return 200', (done) => {
            request(server)
                .get('/login')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });
    describe('POST /login', () => {
        it('expect to return 302', (done) => {
            request(server)
                .post('/login')
                .send({
                    username: 'admin',
                    password: 'sha1$f052f6db$1$58535c1ad07b653d45450b6f010ffee3c7d718bf',
                })
                .expect(302)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
        });
    });
});
