const {
    expect,
} = require('chai');
const {
    init,
} = require('../../../../../../server/app/routers/about.router/controller');
const config = require('../../../../../../server/config');

describe('about router', () => {
    let data = null;
    const app = null;
    let controller = null;
    // const users = [1, 2, 3];
    // const threads = [1, 2, 3];
    // const posts = [1, 2, 3];
    const context = {
        title: 'About',
        users: [1, 2, 3],
        threads: [1, 2, 3],
        posts: [1, 2, 3],
    };
    let req = null;
    let res = null;

    beforeEach(() => {
        data = {
            users: {
                getAll() {
                    return Promise.resolve(context.users);
                },
            },
            threads: {
                getAll() {
                    return Promise.resolve(context.threads);
                },
            },
            posts: {
                getAll() {
                    return Promise.resolve(context.posts);
                },
            },
        };

        controller = init(app, data, config.options);
        req = require('../../../../req-res').getRequestMock();
        res = require('../../../../req-res').getResponseMock();
    });

    it('generateAboutView()', () => {
        return controller.generateAboutView(req, res)
            .then(() => {
                expect(res.options).to.be.deep.equal(context);
                expect(res.viewName).to.be.equal('about');
            });
    });
});
