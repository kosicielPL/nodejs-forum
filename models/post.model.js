const BaseModel = require('./base/base.model');

class Post extends BaseModel {
    static isValid(model) {
        return typeof model !== 'undefined' &&
            typeof model.content === 'string';
    }

    static toViewModel(model) {
        const viewModel = new Post();

        Object.keys(model)
            .forEach((prop) => {
                viewModel[prop] = model[prop];
            });

        return viewModel;
    }
}

module.exports = Post;
