const init = (app, data, config) => {
    const controller = {
        generateHomeView(req, res) {
            let adminThreadsToDisplay = config.home.adminThreadsToDisplay;

            if (adminThreadsToDisplay < 1 ||
                typeof adminThreadsToDisplay === 'undefined') {
                adminThreadsToDisplay = 1;
            }

            return data.forums
                .getAdminContent(adminThreadsToDisplay)
                .catch((error) => {})
                .then((result) => {
                    return res.render('home', {
                        title: 'Big Test Icicles',
                        forums: result,
                    });
                });
        },
    };

    return controller;
};

module.exports = {
    init,
};
