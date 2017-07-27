const config = require('./server/config');
const ObjectId = require('mongodb').ObjectID;

const categoryEntries = [{
        name: 'General',
        priority: 1,
        forums: [{
                name: 'General Discussion',
                internalName: 'general-discussion',
                description: 'General stuff',
                image: 'max.jpg',
                priority: 1,
            },
            {
                name: 'Announcements',
                internalName: 'announcements',
                description: 'Announcements inside',
                image: 'max.jpg',
                priority: 2,
                admin: true,
            },
            {
                name: 'News',
                internalName: 'news',
                description: 'Everything tech related',
                image: 'max.jpg',
                priority: 3,
                admin: true,
            },
        ],
    },
    {
        name: 'Tech talk',
        priority: 2,
        forums: [{
                name: 'C++',
                internalName: 'c-plus-plus',
                description: 'Everything C++ related',
                image: 'max.jpg',
                priority: '1',
            },
            {
                name: 'C#',
                internalName: 'c-sharp',
                description: 'Everything C# related',
                image: 'max.jpg',
                priority: '2',
            },
            {
                name: 'JavaScript',
                internalName: 'javascript',
                description: 'Everything JavaScript related',
                image: 'max.jpg',
                priority: '3',
            },
            {
                name: 'CSS',
                internalName: 'css',
                description: 'Everything Cascading Style Sheets related',
                image: 'max.jpg',
                priority: '4',
            },
            {
                name: 'HTML',
                internalName: 'html',
                description: 'No real programmers here :\'(',
                image: 'max.jpg',
                priority: '5',
            },
        ],
    },
    {
        name: 'Off-topic',
        priority: 3,
        forums: [{
            name: 'Off-Topic',
            internalName: 'off-topic',
            description: 'Chat about everything',
            image: 'max.jpg',
            priority: '1',
        }],
    },
];

const dbConf = config.database;
let connectionString = 'mongodb://';

if (dbConf.password.length > 0 && dbConf.username.length > 0) {
    connectionString += dbConf.username + ':' + dbConf.password + '@';
}

connectionString += dbConf.host + ':' + dbConf.port + '/' + dbConf.dbName;

const init = {
    async run() {
        const db = await require('./db').init(connectionString);
        const categories = db.collection('categories');
        const forums = db.collection('forums');
        const users = db.collection('users');

        await this.dropDatabase(db);
        await this.populate(categories, forums);
        await this.createAdmin(users);

        console.log('ALL DONE!');
        await db.close();
        process.exit(1);
    },

    async dropDatabase(db) {
        console.log('Dropping database: ' + dbConf.dbName);
        await db.dropDatabase();
        console.log('Done!');
    },

    async populate(categories, forums) {
        console.log('Creating categories with forums...');
        for (let i = 0; i < categoryEntries.length; i++) {
            const category = categoryEntries[i];
            console.log(' -> ' + category.name);

            const dbCategory = {
                _id: new ObjectId(),
                name: category.name,
                priority: category.priority,
                forums: category.forums,
            };

            await categories.insertOne(dbCategory);

            for (let j = 0; j < category.forums.length; j++) {
                const forum = category.forums[j];
                console.log('   -> ' + forum.name);

                const dbForum = {
                    _id: new ObjectId(),
                    name: forum.name,
                    internalName: forum.internalName,
                    description: forum.description,
                    image: forum.image,
                    priority: forum.priority,
                    category: dbCategory._id,
                    threads: [],
                    admin: (forum.admin ? forum.admin : false),
                };

                await forums.insertOne(dbForum);
            }
        }
        console.log('Done!');
    },

    async createAdmin(users) {
        console.log('Creating admin user:');
        console.log(' -> username: \'admin\'');
        console.log(' -> password: \'admin\'');

        await users.insertOne({
            'username': 'admin',
            'password': 'admin',
            'email': 'admin@bigtesticicles.com',
            'firstName': 'Admin',
            'lastName': 'Admin',
            'country': 'Bulgaria',
            'dateJoined': new Date(),
            'avatar': '',
            'role': 'admin',
            'posts': [],
            'threads': [],
            'timezone': 'Africa/Addis_Ababa',
        });

        console.log('Done!');
    },
};

init.run();
