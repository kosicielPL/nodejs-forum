const init = (data) => {
    const controller = {
        async generateUsersView(req, res) {
            const allUsers = await data.users.getAll();
            const page = parseInt(req.params.page, 10) || 1;
            const size = 12;
            const totalUsers = allUsers.length;
            let userLogged;
            let result = allUsers;
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
            // NOT THE BEST BUT CAN'T SORT IT IN MONGO ALPHABETICALLY
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
            // FIX ME
            result = result.slice((page - 1) * size, page * size);

            return res.render('users', {
                title: 'Users',
                allUsers: result,
                currentPage: page * 1,
                totalPages: totalPages * 1,
                totalUsers: totalUsers * 1,
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
