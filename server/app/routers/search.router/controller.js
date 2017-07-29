const init = (app, data, config) => {
    const controller = {

        showSearchForm(req, res, next) {
            return res.render('search', {
                title: 'Search',
            });
        },

        async showSearchResults(req, res, next) {
            const title = req.params.title;
            let page = req.params.page;
            let threadsPerPage = config.forums.forumView.threadsPerPage;

            if (page < 1 || typeof page === 'undefined') {
                page = 1;
            }

            if (threadsPerPage < 1 || typeof threadsPerPage === 'undefined') {
                threadsPerPage = 1;
            }

            const threads = await data.threads.findByTitle(title);

            if (threads.length <= 0) {
                return res.render('error', {
                    title: 'Error 404',
                    message: 'Nothing found about \'' + title + '\'',
                    error: {
                        status: 404,
                    },
                });
            }

            const dbThreadsCount = threads.length;

            let totalPages = dbThreadsCount / threadsPerPage;
            totalPages = Math.ceil(totalPages);

            if (page > totalPages && page > 1) {
                return res.redirect(
                    '/forums/'
                );
            }

            let result = threads;
            result = result
                .slice((page - 1) * threadsPerPage, page * threadsPerPage);

            return res.render('forum/search', {
                title: title,
                forum: title,
                threads: result,
                currentPage: page * 1,
                totalPages: totalPages * 1,
                threadsCount: dbThreadsCount * 1,
            });
        },
    };

    return controller;
};

module.exports = {
    init,
};
