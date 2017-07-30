const init = (config, data) => {
    const validate = {
        async data(type, args) {
            switch (type) {
                case 'username':
                    return this.username(args);
                case 'firstName':
                    return this.firstName(args);
                case 'lastName':
                    return this.lastName(args);
                case 'email':
                    return this.email(args);
                case 'password':
                    return this.password(args[0], args[1]);
                default:
                    throw Error('Validation data type not recognized!');
            }
        },
        async username(username) {
            const minLength = config.username.minLength;
            const maxLength = config.username.maxLength;

            if (typeof username === 'undefined') {
                throw new Error('Provide a passwordConfirm!');
            }

            if (username.length < minLength ||
                username.length > maxLength) {
                throw new Error(
                    'Password must be between ' +
                    minLength + ' and ' + maxLength +
                    ' symbols'
                );
            }

            if (data) {
                const usernameTaken = await data.users.findByUsername(username);
                if (usernameTaken) {
                    throw new Error('Username \"' + username + '\" is taken');
                }
            }

            return true;
        },

        async email(email) {
            const regex = new RegExp(config.email.regex);

            if (typeof email === 'undefined') {
                throw new Error('Provide an email!');
            }

            if (!regex.test(email)) {
                throw new Error('Invalid email');
            }

            if (data) {
                const emailTaken = await data.users.findByEmail(email);
                if (emailTaken) {
                    throw new Error(
                        'There is already a user with email: ' + email
                    );
                }
            }

            return true;
        },

        async passwords(password, passwordConfirm) {
            if (typeof password === 'undefined') {
                throw new Error('Provide a password!');
            }

            if (typeof passwordConfirm === 'undefined') {
                throw new Error('Provide a passwordConfirm!');
            }

            if (password.length < config.password.minLength ||
                password.length > config.password.maxLength) {
                throw new Error(
                    'Password must be between ' +
                    config.password.minLength +
                    ' and ' +
                    config.password.maxLength +
                    ' symbols'
                );
            }

            if (password !== passwordConfirm) {
                throw new Error('Passwords don\'t match!');
            }

            return true;
        },

        async firstName(firstName) {
            const minLength = config.firstName.minLength;
            const maxLength = config.firstName.maxLength;

            if (typeof firstName === 'undefined') {
                throw new Error('Provide a passwordConfirm!');
            }

            if (firstName.length < minLength ||
                firstName.length > maxLength) {
                throw new Error(
                    'First name must be between ' +
                    minLength + ' and ' + maxLength +
                    ' symbols'
                );
            }

            return true;
        },

        async lastName(lastName) {
            const minLength = config.lastName.minLength;
            const maxLength = config.lastName.maxLength;

            if (typeof lastName === 'undefined') {
                throw new Error('Provide a passwordConfirm!');
            }

            if (lastName.length < minLength ||
                lastName.length > maxLength) {
                throw new Error(
                    'First name must be between ' +
                    minLength + ' and ' + maxLength +
                    ' symbols'
                );
            }

            return true;
        },

        // THIS IS HELL OF VALIDATION :D :D 
        async avatar(avatar) {
            return true;
        },

        async country(country, countries) {
            if (typeof country === 'undefined') {
                throw new Error('Provide a country!');
            }

            if (countries.indexOf(country) < 0) {
                throw new Error('Invalid country!');
            }

            return true;
        },

        async timezone(timezone, timezones) {
            return true;
        },

        async thread(title, content) {
            const titleMinLength = config.thread.titleMinLength;
            const titleMaxLength = config.thread.titleMaxLength;
            const contentMinLength = config.post.minLength;
            const contentMaxLength = config.post.maxLength;

            if (typeof title === 'undefined') {
                throw new Error('Provide a title');
            }

            if (typeof content === 'undefined') {
                throw new Error('Provide content');
            }

            if (title.length < titleMinLength ||
                title.length > titleMaxLength) {
                throw new Error('Thread title must be between' +
                    titleMinLength + ' and ' + titleMaxLength +
                    ' characters'
                );
            }

            if (content.length < contentMinLength ||
                content.length > contentMaxLength) {
                throw new Error('Thread content must be between' +
                    contentMinLength + ' and ' + contentMaxLength +
                    ' characters'
                );
            }

            return true;
        },

        async post(content) {
            const contentMinLength = config.post.minLength;
            const contentMaxLength = config.post.maxLength;

            if (typeof content === 'undefined') {
                throw new Error('Provide content');
            }

            if (content.length < contentMinLength ||
                content.length > contentMaxLength) {
                throw new Error('Thread content must be between' +
                    contentMinLength + ' and ' + contentMaxLength +
                    ' characters'
                );
            }

            return true;
        },
    };

    return validate;
};

module.exports = {
    init,
};
