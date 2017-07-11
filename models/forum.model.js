const BaseModel = require('./base/base.model');

class Forum extends BaseModel {
    static isValid(model) {
        return typeof model !== 'undefined' &&
            typeof model.text === 'string' &&
            model.text.length > 3;
    }

    static toViewModel(model) {
        const viewModel = new Forum();

        Object.keys(model)
            .forEach((prop) => {
                viewModel[prop] = model[prop];
            });

        return viewModel;
    }
}

module.exports = Forum;
