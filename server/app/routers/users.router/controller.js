const init = (data) => {
    const controller = {
        generateProfileView(req, res) {
            const user = req.params.user;

            return res.render('user/profile', {
                title: user + '\'s profile',
                user: user,
            });
        },
    };

    return controller;
};

module.exports = {
    init,
};
