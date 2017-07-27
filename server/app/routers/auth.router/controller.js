const passport = require('passport');
const countries = require('.././../utils/countries');
const timezones = require('.././../utils/timezones');

const init = (data, config) => {
    const controller = {
        generateSignupView(req, res) {
            return res.render('user/signup', {
                title: 'Sign up',
                countries: countries,
                timezones: timezones,
            });
        },

        generateLoginView(req, res) {
            return res.render('user/login', {
                title: 'Log in',
            });
        },

        async signup(req, res) {
            const validate = require('../../validator').init(config, data);

            const username = req.body.username;
            const email = req.body.email;
            const password = req.body.password;
            const passwordConfirm = req.body.passwordconfirm;
            const firstName = req.body.firstname;
            const lastName = req.body.lastname;
            const avatar = req.files.avatar;
            const country = req.body.country;
            const timezone = req.body.timezone;

            try {
                await validate.username(username);
                await validate.email(email);
                await validate.passwords(password, passwordConfirm);
                await validate.firstName(firstName);
                await validate.lastName(lastName);
                await validate.country(country, countries);
                await validate.timezone(timezone, timezones);
                await validate.avatar(avatar);
            } catch (error) {
                return res.send(error.message);
            }

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
                    timezone: timezone,
                });
            } catch (error) {
                return res.send(error);
            }

            req.flash('success',
                'Account \"' + username + '\" created. You may now login.'
            );
            return res.redirect('/login');
        },

        login(req, res) {
            passport.authenticate('local', function(err, user, info) {
                if (err) {
                    req.flash('error', err.message);
                    return res.redirect('/login');
                }

                if (!user) {
                    return res.redirect('/');
                }

                return req.login(user, function(error) {
                    if (error) {
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
