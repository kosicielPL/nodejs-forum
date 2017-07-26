const passport = require('passport');
const countries = require('.././../utils/countries');

const init = (data) => {
    const controller = {
        generateSignupView(req, res) {
            return res.render('user/signup', {
                title: 'Sign up',
                countries: countries,
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
            const country = req.body.country;

            if (countries.indexOf(country) < 0) {
                return res.send('invalid country!');
            }

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
                    country: country,
                    dateJoined: new Date(),
                    avatar: avatarFileName,
                    role: 'user',
                    posts: [],
                    threads: [],
                });
            } catch (error) {
                return res.send(error);
            }

            req.flash('success', 'Account ' + username + ' created. You may now login.');
            return res.redirect('/login');
        },

        login(req, res) {
            passport.authenticate('local', function(err, user, info) {
                if (err) {
                    req.flash('error', err.message);
                    // return res.send(req.flash());
                    return res.redirect('/login');
                }

                if (!user) {
                    return res.redirect('/');
                }
                // req / res held in closure
                return req.logIn(user, function(error) {
                    if (error) {
                        req.flash("info", "Email queued");
                        return res.redirect('/login');
                    }
                    if (req.body.rememberme !== 'rememberme') {
                        req.session.cookie.expires = false;
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
