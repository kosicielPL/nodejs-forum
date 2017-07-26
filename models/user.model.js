const BaseModel = require('./base/base.model');

class User extends BaseModel {
    static isValid(model) {
        const regex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
        if (typeof model === 'undefined') {
            return false;
        }
        if (typeof model.username !== 'string' &&
            model.username.length < 4) {
            return false;
        }
        if (model.password < 6) {
            return false;
        }
        if (!regex.test(model.email)) {
            return false;
        }
        if (typeof model.firstName !== 'string' &&
            model.firstName.length < 3) {
            return false;
        }
        if (typeof model.firstName !== 'string' &&
            model.firstName.length < 3) {
            return false;
        }
        return true;
    }

    static toViewModel(model) {
        const viewModel = new User();

        Object.keys(model)
            .forEach((prop) => {
                viewModel[prop] = model[prop];
            });

        return viewModel;
    }
}

module.exports = User;
