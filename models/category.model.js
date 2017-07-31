const BaseModel = require('./base/base.model');

class Category extends BaseModel {
    static isValid(model) {
        return typeof model !== 'undefined' &&
            typeof model.name === 'string';
    }

    static toViewModel(model) {
        const viewModel = new Category();

        Object.keys(model)
            .forEach((prop) => {
                viewModel[prop] = model[prop];
            });

        return viewModel;
    }
}

module.exports = Category;
