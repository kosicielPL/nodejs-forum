const init = (app, data) => {
    const controller = {
        generateHomeView(req, res) {
            data.forums
                .getAdminContent(5)
                .catch((error) => {})
                .then((result) => {
                    // res.send(result);
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
