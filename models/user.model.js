const BaseModel = require('./base/base.model');

class User extends BaseModel {
    static isValid(model) {
        return typeof model !== 'undefined' &&
            typeof model.username === 'string' &&
            typeof model.firstName === 'string' &&
            typeof model.lastName === 'string' &&
            typeof model.password !== 'undefined';
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
