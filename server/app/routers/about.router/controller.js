const init = (data) => {
    const controller = {
        async generateAboutView(req, res) {
            const allUsers = await data.users.getAll();
            const allThreads = await data.threads.getAll();
            const allPosts = await data.posts.getAll();

            return res.render('about', {
                title: 'About',
                users: allUsers.length,
                threads: allThreads.length,
                posts: allPosts.length,
            });
        },
    };

    return controller;
};

module.exports = {
    init,
};
