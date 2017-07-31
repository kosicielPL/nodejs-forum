let driver = null;

const ui = require('./ui');
const async = require('../../../common/async');

const login = (username, pass) => {
    return async()
        .then(() => ui.click('.dropdown-toggle'))
        .then(() => ui.click('.dropdown-menu li:first-child'))
        .then(() => ui.setValue('input[name="username"]', username))
        .then(() => ui.setValue('input[name="password"]', pass))
        .then(() => ui.click('button[type="submit"]'));
};

module.exports = {
    setDriver(_driver) {
        driver = _driver;
        ui.setDriver(driver);
    },

    login,
};
