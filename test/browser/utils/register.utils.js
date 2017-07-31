let driver = null;

const ui = require('./ui');
const async = require('../../../common/async');

const register = (username, email, firstName, lastName, password) => {
    return async()
        .then(() => ui.click('.dropdown-toggle'))
        .then(() => ui.click('.dropdown-menu li:last-child'))
        .then(() => ui.setValue('input[name="username"]', username))
        .then(() => ui.setValue('input[name="email"]', email))
        .then(() => ui.setValue('input[name="firstname"]', firstName))
        .then(() => ui.setValue('input[name="lastname"]', lastName))
        .then(() => ui.setValue('input[name="password"]', password))
        .then(() => ui.click('button[type="submit"]'));
};

module.exports = {
    setDriver(_driver) {
        driver = _driver;
        ui.setDriver(driver);
    },

    register,
};
