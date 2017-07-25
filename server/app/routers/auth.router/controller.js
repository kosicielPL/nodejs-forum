const passport = require('passport');

const init = (data) => {
    const controller = {
        generateSignupView(req, res) {
            return res.render('user/signup', {
                title: 'Sign up',
            });
        },

        generateLoginView(req, res) {
            return res.render('user/login', {
                title: 'Log in',
            });
        },

        async signup(req, res) {
            const username = req.body.username;

            const usernameTaken = await data.users.findByUsername(username);

            if (usernameTaken) {
                return res.send('username is taken');
            }

            let email = req.body.email;
            email = email.toLowerCase();
            const emailTaken = await data.users.getByCriteria('email', email);

            if (emailTaken.length > 0) {
                return res.send('there is already a user with email: ' + email);
            }

            const password = req.body.password;
            const passwordConfirm = req.body.passwordconfirm;

            if (password !== passwordConfirm) {
                return res.send('passwords don\'t match!');
            }

            const firstName = req.body.firstname;
            const lastName = req.body.lastname;
            const avatar = req.files.avatar;
            let avatarFileName = '';

            if (avatar) {
                const extension = avatar.name.split('.').pop();
                avatarFileName = username + '.' + extension;
                avatarFileName = avatarFileName.toLowerCase();

                avatar.mv(
                    './client/img/avatars/users/' + avatarFileName,
                    function(err) {
                        if (err) {
                            console.log(err);
                        }
                    });
            }

            try {
                await data.users.create({
                    username: username,
                    password: password,
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    avatar: avatarFileName,
                    role: 'user',
                });
            } catch (error) {
                return res.send(error);
            }

            return res.redirect('/');
        },

        login(req, res) {
            passport.authenticate('local', function(err, user, info) {
                if (err) {
                    return res.redirect('/login');
                }

                if (!user) {
                    return res.redirect('/');
                }
                // req / res held in closure
                req.logIn(user, function(err) {
                    if (err) {
                        return res.redirect('/login');
                    }
                    if (req.body.rememberme !== 'rememberme') {
                        req.session.cookie.expires = false;
                        // req.session.cookie.maxAge = 0;
                    }
                    return res.redirect('/');
                });
            })(req, res);
        },

        logout(req, res) {
            req.logout();
            return res.redirect('/');
        },
    };

    return controller;
};

module.exports = {
    init,
};
