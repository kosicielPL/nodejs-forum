const init = (data) => {
    const controller = {
        async generateProfileView(req, res) {
            const targetUsername = req.params.user;
            const targetUser = await data.users.findByUsername(targetUsername);

            if(!targetUser){
                
                return res.render('error', {
                    title: 'Error 404',
                    message: 'User not found',
                    error: {
                        status: 404,
                    },
                });
            }

            return res.render('user/profile', {
                title: targetUser.username + '\'s profile',
                targetUser: targetUser,
            });
        },
    };

    return controller;
};

module.exports = {
    init,
};
