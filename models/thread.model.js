const BaseModel = require('./base/base.model');

class Thread extends BaseModel {
    static isValid(model) {
        return typeof model !== 'undefined' &&
            typeof model.content === 'string' &&
            typeof model.title === 'string' &&
            typeof model.authorName === 'string';
    }

    static toViewModel(model) {
        const viewModel = new Thread();

        Object.keys(model)
            .forEach((prop) => {
                viewModel[prop] = model[prop];
            });

        return viewModel;
    }
}

module.exports = Thread;
