const init = (data) => {
    const controller = {
        generateMenuStructure(req, res) {
            return data.categories
                .getStructure()
                .then((result) => {
                    res.render('mobileMenuStructure', {
                        structure: result,
                    });
                });
        },
    };

    return controller;
};

module.exports = {
    init,
};
