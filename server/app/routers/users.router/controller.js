const init = (data) => {
    const controller = {
        async generateUsersView(req, res) {
            const page = parseInt(req.params.page, 10) || 1;
            const size = 12;
            const username = req.query.username;
            const allUsers = await data.users.getAllUsersLength(username);
            const totalUsers = allUsers.length;
            let userLogged;
            let totalPages = totalUsers / size;
            totalPages = Math.ceil(totalPages);


            if (page < 1 || typeof page === 'undefined') {
                page = 1;
            }

            if (page > totalPages && page > 1) {
                return res.redirect(
                    '/users'
                );
            }

            const users = await data.users
                .getAllUsers(username, 12, page);


            if (req.user) {
                userLogged = req.user;
            }

            return res.render('users', {
                title: 'Users',
                allUsers: users,
                currentPage: page * 1,
                totalPages: totalPages * 1,
                totalUsers: totalUsers * 1,
                userLogged: userLogged,
                username: username,
            });
        },

        async generateProfileView(req, res) {
            const targetUsername = req.params.user;
            const targetUser = await data.users.findByUsername(targetUsername);

            if (!targetUser) {
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

        async generateSettingsView(req, res) {
            const user = req.user;

            if (!user) {
                return res.render('error', {
                    title: 'Error 404',
                    message: 'User not found',
                    error: {
                        status: 404,
                    },
                });
            }
            return res.render('user/settings', {
                title: user.username + '\'s profile settings',
                targetUser: user,
            });
        },

        async updateUser(req, res) {
            const userId = req.user._id;
            const buffer = {};
            const updateModel = {};

            buffer.username = req.body.username;
            buffer.firstName = req.body.firstname;
            buffer.lastName = req.body.lastname;
            buffer.email = req.body.email;
            buffer.password = req.body.password;

            Object.keys(buffer).forEach((key) => {
                if (buffer[key] !== ''
                    && typeof buffer[key] !== 'undefined'
                    && buffer[key] !== req.user[key]) {
                    updateModel[key] = buffer[key];
                }
            });

            try {
                await data.users.updateById(userId, updateModel);
            } catch (error) {
                console.log(error);
                return res.send(error);
            }

            req.flash('success',
                req.user.username + '\'s account updated.'
            );
            return res.redirect('/users/profile/' + req.user.username);
        },
    };

    return controller;
};

module.exports = {
    init,
};
