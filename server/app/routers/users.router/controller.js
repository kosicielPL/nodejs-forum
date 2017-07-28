const init = (data) => {
    const controller = {
        async generateUsersView(req, res) {
            const allUsers = await data.users.getAll();
            let userLogged;
            let result = allUsers;
            const page = parseInt(req.params.page, 10) || 1;
            const size = 12;

            let totalPages = allUsers.length / size;
            totalPages = Math.ceil(totalPages);

            if (page < 1 || typeof page === 'undefined') {
                page = 1;
            }

            if (page > totalPages && page > 1) {
                return res.redirect(
                    '/users'
                );
            }

            if (req.user) {
                userLogged = req.user;
            }

            result.sort(function(a, b) {
                const nameA = a.username.toLowerCase();
                const nameB = b.username.toLowerCase();
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            });

            result = result.slice((page - 1) * size, page * size);

            return res.render('users', {
                title: 'Users',
                allUsers: result,
                currentPage: page * 1,
                totalPages: totalPages * 1,
                userLogged: userLogged,
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

            return res.render('user/settings', {
                title: targetUser.username + '\'s profile settings',
                targetUser: targetUser,
            });
        },
    };

    return controller;
};

module.exports = {
    init,
};
