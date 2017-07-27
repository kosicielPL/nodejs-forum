const init = (data, config) => {
    const controller = {
        async generateMenuStructure(req, res) {
            const categoriesStruct =
                await data.categories.getStructure();

            return res.render('mobileMenuStructure', {
                structure: categoriesStruct,
            });
        },

        async generateNewestThreads(req, res) {
            let threadsToDisplay = config.home.newThreadsToDisplay;

            if (threadsToDisplay < 1 ||
                typeof threadsToDisplay === 'undefined') {
                threadsToDisplay = 1;
            }

            const newestThreads =
                await data.threads.getNewestN(threadsToDisplay);

            return res.render('newestThreads', {
                newestThreads: newestThreads,
            });
        },

        async checkUsername(req, res) {
            const username = req.query.username;
            const usernameTaken = await data.users.findByUsername(username);

            if (usernameTaken) {
                res.writeHead(400,
                    'Username \"' +
                    usernameTaken.username +
                    '\" is taken.');
                return res.send();
            }

            return res.sendStatus(200);
        },

        async checkEmail(req, res) {
            const email = req.query.email;
            const emailTaken = await data.users.findByEmail(email);

            if (emailTaken) {
                res.writeHead(400,
                    'Email \"' +
                    emailTaken.email +
                    '\" is taken.');
                return res.send();
            }

            return res.sendStatus(200);
        },

    };

    return controller;
};

module.exports = {
    init,
};
