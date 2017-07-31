const request = require('supertest');
const http = require('http');
const config = require('../../../server/config');

describe('about routing', () => {
    let app = null;
    let server = null;
    const connectionString = 'mongodb://localhost:27017/about-db-tests';

    beforeEach(() => {
        return Promise.resolve()
            .then(() => require('../../../db').init(connectionString))
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
    describe('GET /about', () => {
        it('expect to return 200', (done) => {
            request(server)
                .get('/about')
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
