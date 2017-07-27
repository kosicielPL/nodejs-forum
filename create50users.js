const config = require('./server/config');
const ObjectId = require('mongodb').ObjectID;

const dbConf = config.database;
let connectionString = 'mongodb://';

if (dbConf.password.length > 0 && dbConf.username.length > 0) {
    connectionString += dbConf.username + ':' + dbConf.password + '@';
}

connectionString += dbConf.host + ':' + dbConf.port + '/' + dbConf.dbName;

const init = {
    async run() {
        const db = await require('./db').init(connectionString);
        const users = db.collection('users');
        const count = 50;

        await this.createUsers(users, count);

        console.log('ALL DONE!');
        await db.close();
        process.exit(1);
    },

    async createUsers(users, count) {
        console.log('Creating ' + count + ' users');

        const usersArr = [];

        for (let i = 0; i < count; i++) {
            usersArr.push({
                'username': 'TestUser' + i,
                'password': 'sha1$09e9126a$1$6dbd077b89e72afa0c6d485353b1d3d2d65267d6',
                'email': 'testuser' + i + '@bigtesticicles.com',
                'firstName': 'TestUserFirstName' + i,
                'lastName': 'TestUserLastName' + i,
                'country': 'Bulgaria',
                'dateJoined': new Date(),
                'avatar': '',
                'role': 'user',
                'posts': [],
                'threads': [],
                'timezone': 'Africa/Addis_Ababa',
            });
        }

        await users.insert(usersArr);

        console.log('Done!');
    },
};

init.run();
