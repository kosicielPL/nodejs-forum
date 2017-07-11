const init = (data) => {
    const controller = {
        generateProfileView(req, res) {
            const user = req.params.user;

            return res.render('user/profile', {
                title: user + '\'s profile',
                user: user,
            });
        },

        generateSignupView(req, res) {
            const user = req.params.user;

            return res.render('user/signup', {
                title: 'Sign up',
            });
        },

        generateLoginView(req, res) {
            const user = req.params.user;

            return res.render('user/login', {
                title: 'Log in',
            });
        },
    };

    return controller;
};

module.exports = {
    init,
};
