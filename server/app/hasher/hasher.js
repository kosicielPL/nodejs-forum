const passwordHash = require('password-hash');

const init = () => {
    const hash = {
        password(password) {
            return passwordHash.generate(password);
        },

        compare(unhashed, hashed) {
            return passwordHash.verify(unhashed, hashed);
        },

        isHashed(password) {
            return passwordHash.isHashed(password);
        },
    };

    return hash;
};

module.exports = {
    init,
};
