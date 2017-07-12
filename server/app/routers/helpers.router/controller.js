const init = (data) => {
    const controller = {
        generateMenuStructure(req, res) {
            return data.categories
                .getStructure()
                .then((result) => {
                    res.render('mobileMenuStructure', {
                        structure: result,
                    });
                });
        },

        generateNewestThreads(req, res) {
            const threadsToDisplay = 5;
            data.threads
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
