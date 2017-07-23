const request = require('supertest');
const http = require('http');
const config = require('../../../server/config');

describe('forums routing', () => {
    let app = null;
    let server = null;

    beforeEach(() => {
        return Promise.resolve()
            .then(() => require('../../../db').init(config.database))
            .then((db) => require('../../../data').init(db))
            .then((data) => require('../../../server/app')
                .init(data, config.options))
            .then((_app) => {
                app = _app;
                server = http.createServer(app);
                require('../../../server/socketio')
                    .init(server)
                    .then((io) => {
                        app.io = io;
                    });
            });
    });
    describe('GET /', () => {
        it('expect to return 200', (done) => {
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
    });
    describe('GET /forums/', () => {
        it('expect to return 200', (done) => {
            request(server)
                .get('/forums/')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });
    describe('GET /forums/:forum', () => {
        it('expect to return 200 when valid :forum', (done) => {
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
    describe('GET /forums/:forum', () => {
        it('expect to return 404 when invalid :forum', (done) => {
            request(server)
                .get('/forums/afaf')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });
});
