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
    };

    return controller;
};

module.exports = {
    init,
};
