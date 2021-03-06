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

            const threads = await data.threads
                .findByTitle(title, threadsPerPage, page);

            if (threads.length <= 0) {
                const error = new Error(
                    'Nothing found about \'' + title + '\''
                );
                error.status = 404;
                return next(error);
            }

            const dbThreads = await data.threads
                .findByTitleLength(title);
            const dbThreadsCount = dbThreads.length;

            let totalPages = dbThreadsCount / threadsPerPage;
            totalPages = Math.ceil(totalPages);

            if (page > totalPages && page > 1) {
                return res.redirect(
                    '/forums/'
                );
            }

            return res.render('forum/search', {
                title: title,
                forum: title,
                threads: threads,
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
