const init = (app, data) => {
    const controller = {
        generateHomeView(req, res) {
            return res.render('index', {
                title: 'Big Test Icicles',
            });
        },
    };

    return controller;
};

module.exports = {
    init,
};
