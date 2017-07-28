const init = (app, data, config) => {
    const controller = {
        async showSearchResults(req, res, next) {
            // let threadsPerPage = config.forums.forumView.threadsPerPage;
            const title = req.params.title;

            // const search = req.query.search;

            // if (page < 1 || typeof page === 'undefined') {
            //     page = 1;
            // }

            // if (threadsPerPage < 1 || typeof threadsPerPage === 'undefined') {
            //     threadsPerPage = 1;
            // }

            // let dbForum =
            //     await data.forums.getByCriteria('internalName');

            // if (!dbForum || dbForum.length <= 0) {
            //     return res.render('error', {
            //         title: 'Error 404',
            //         message: 'Forum not found',
            //         error: {
            //             status: 404,
            //         },
            //     });
            // }

            // dbForum = dbForum[0];

            // let dbThreads =
            //     await data.threads.getInForum(
            //         dbForum._id, threadsPerPage, page
            //     );

            // if (search) {
            //     dbThreads = dbThreads.filter((thread) => {
            //         return thread.title.toLowerCase().includes(search);
            //     });
            // }

            // const dbThreadsCount = dbForum.threads.length;

            // let totalPages = dbThreadsCount / threadsPerPage;
            // totalPages = Math.ceil(totalPages);

            // if (page > totalPages && page > 1) {
            //     return res.redirect(
            //         '/forums/'
            //     );
            // }

            // return res.render('forum/forum', {
            //     title: dbForum.name,
            //     forum: dbForum,
            //     threads: dbThreads,
            //     currentPage: page * 1,
            //     totalPages: totalPages * 1,
            //     threadsCount: dbThreadsCount * 1,
            //     searchedContent: search,
            // });
            const threads = await data.threads.findByTitle(title);

            res.send(threads);
        },
    };

    return controller;
};

module.exports = {
    init,
};
