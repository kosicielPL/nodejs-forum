const init = (data) => {
    const controller = {
        generateSettingsView(req, res) {
            return res.render('settings', {
                title: 'Settings',
            });
        },
    };

    return controller;
};

module.exports = {
    init,
};
