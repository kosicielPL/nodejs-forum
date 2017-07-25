const init = (app, data, config) => {
    const controller = {
        async generateHomeView(req, res, next) {
            console.log(req.user);
            let adminThreadsToDisplay = config.home.adminThreadsToDisplay;

            if (adminThreadsToDisplay < 1 ||
                typeof adminThreadsToDisplay === 'undefined') {
                adminThreadsToDisplay = 1;
            }

            const adminThreads =
                await data.forums.getAdminContent(adminThreadsToDisplay);

            return res.render('home', {
                title: 'Big Test Icicles',
                forums: adminThreads,
            });
        },
    };

    return controller;
};

module.exports = {
    init,
};
