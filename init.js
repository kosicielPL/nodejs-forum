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

require('./db').init(config.database)
    .then((db) => {
        const categories = db.collection('categories');
        const forums = db.collection('forums');


        categories
            .find()
            .count()
            .then((count) => {
                console.log('Found ' + count + ' categories.');
                if (count <= 0) {
                    populate(categories, forums);
                } else {
                    Promise.all([
                            db.collection('categories').drop(),
                            db.collection('forums').drop(),
                            db.collection('threads').drop(),
                            db.collection('posts').drop(),
                        ])
                        .catch(() => {

                        })
                        .then(() => {
                            console.log('Collections dropped...');
                            populate(categories, forums)
                                .then(() => {
                                    console.log(' > ALL DONE!');
                                    process.exit(1);
                                });
                        });

                    return;
                }
            });

        return;
    });

function populate(categories, forums) {
    const categoryQueue = [];
    const forumQueue = [];

    categoryEntries.forEach((category) => {
        const catDbEntry = {
            _id: new ObjectId(),
            name: category.name,
            priority: category.priority,
            forums: [],
        };

        category.forums.forEach((forum) => {
            forum._id = new ObjectId();
            catDbEntry.forums.push(forum._id);
            forum.category = catDbEntry._id;
            forumQueue.push(forums.insertOne(forum));
        });
        categoryQueue.push(categories.insertOne(catDbEntry));
    });

    return new Promise((resolve, reject) => {
        console.log(' > Creating categories...');
        Promise
            .all(categoryQueue)
            .catch((error) => {
                console.log(error);
            })
            .then(() => {
                console.log(' > Done!');
                console.log(' > Creating forums...');
                Promise
                    .all(forumQueue)
                    .then((result) => {
                        console.log(' > Done!');
                        resolve();
                    });
            });
    });
}
