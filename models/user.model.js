const BaseModel = require('./base/base.model');

class User extends BaseModel {
    static isValid(model) {
        return typeof model !== 'undefined' &&
            typeof model.text === 'string' &&
            model.text.length > 3;
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
