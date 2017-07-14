const init = (data, config) => {
    const controller = {
        generateMenuStructure(req, res) {
            return data.categories
                .getStructure()
                .then((result) => {
                    return res.render('mobileMenuStructure', {
                        structure: result,
                    });
                });
        },

        generateNewestThreads(req, res) {
            let threadsToDisplay = config.home.newThreadsToDisplay;

            if (threadsToDisplay < 1 ||
                typeof threadsToDisplay === 'undefined') {
                threadsToDisplay = 1;
            }

            return data.threads
                .getNewestN(threadsToDisplay)
                .catch((error) => {
                    res.send(error); // ADD 404 ERROR PAGE
                })
                .then((result) => {
                    return res.render('newestThreads', {
                        newestThreads: result,
                    });
                });
        },
    };

    return controller;
};

module.exports = {
    init,
};
