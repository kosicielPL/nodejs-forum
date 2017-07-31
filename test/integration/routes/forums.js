const request = require('supertest');
const http = require('http');
const config = require('../../../server/config');

describe('forums routing', () => {
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

    describe('GET and expect 200', () => {
        it('/', (done) => {
            request(server)
                .get('/')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
        it('/forums/', (done) => {
            request(server)
                .get('/forums')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
        it('/forums/:forum when valid :forum', (done) => {
            request(server)
                .get('/forums/general-discussion')
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
        it('/forums/:forum when invalid :forum', (done) => {
            request(server)
                .get('/forums/afaf')
                .expect(404)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });
    describe('/POST forums', () => {
        it('/forums/:forum/new-thread', (done) => {
            request(server)
                .post('/forums/:forum/new-thread')
                .expect(302)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
        it('/forums/thread/:id', (done) => {
            request(server)
                .post('/forums/thread/:id')
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
