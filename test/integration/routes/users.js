const request = require('supertest');
const http = require('http');
const config = require('../../../server/config');

describe('users routing', () => {
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

    describe('GET /users', () => {
        it('expect to return 200', (done) => {
            request(server)
                .get('/users')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
        it('if there is a second page - shoud return 200', (done) => {
            request(server)
                .get('/users/2')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
        it('/users/profile/:user when valid :user', (done) => {
            request(server)
                .get('/users/profile/admin')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });

        it('expect to get 302 from /logout', (done) => {
            request(server)
                .get('/logout')
                .expect(302)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });
    describe('GET and expect 404', () => {
        it('/users/profile/:user when invalid :user', (done) => {
            request(server)
                .get('/users/profile/asdasdasdf')
                .expect(404)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });

    // describe('/POST /signup', () => {
    //     it('expect to return 200', (done) => {
    //         request(server)
    //             .post('/signup')
    //             .send({
    //                 username: 'test1234',
    //                 password: 'test1234',
    //                 email: 'test@bigtesticicles.com',
    //                 firstName: 'test',
    //                 lastName: 'test',
    //                 country: 'Bulgaria',
    //                 dateJoined: '2017-07-27 19:01:32.193Z',
    //                 avatar: '',
    //                 role: 'user',
    //                 posts: [],
    //                 threads: [],
    //                 timezone: 'Africa/Addis_Ababa',
    //             })
    //             .expect(200)
    //             .end((err, res) => {
    //                 if (err) {
    //                     return done(err);
    //                 }
    //                 return done();
    //             });
    //     });
    // });

    describe('/POST tests:', () => {
        // const user = {
        //     username: 'test',
        //     password: 'test',
        //     email: 'test',
        //     firstName: 'test',
        //     lastName: 'test',
        //     country: 'Bulgaria',
        //     dateJoined: 'test',
        //     avatar: '',
        //     role: 'user',
        //     posts: [],
        //     threads: [],
        //     timezone: 'Africa/Addis_Ababa',
        // };
        // const profile = {
        //     username: 'test',
        //     email: 'test',
        //     firstName: 'test',
        //     lastName: 'test',
        // };
        const login = {
            username: 'test',
            password: 'test',
        };

        it('expect to get 302 from /login', (done) => {
            request(server)
                .post('/login')
                .send(login)
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
