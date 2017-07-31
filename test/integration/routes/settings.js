const request = require('supertest');
const http = require('http');
const config = require('../../../server/config');

describe('settings routing', () => {
    let app = null;
    let server = null;
    let user;

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
                        user = request.agent(server);
                        return Promise.resolve();
                    });
            });
    });

    after(() => {
        server.close();
        server = null;
        app = null;
    });

    describe('/settings logged in', () => {
        it('/settings logged in', (done) => {
            user
                .post('/login')
                .send({
                    username: 'admin',
                    password: 'admin',
                })
                .end((error, resolve) => {
                    user
                        .get('/users/profile/admin/settings')
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

    describe('GET /settings (admin)', () => {
        it('expect to return 404', (done) => {
            request(server)
                .get('/http://localhost:3000/users/profile/admin/settings')
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
