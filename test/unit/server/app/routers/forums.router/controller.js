const {
    expect,
} = require('chai');
const {
    init,
} = require('../../../../../../server/app/routers/forums.router/controller');
const config = require('../../../../../../server/config');

describe('forums router', () => {
    let data = null;
    const app = null;
    let controller = null;
    const items = [1, 2, 3];
    let req = null;
    let res = null;

    beforeEach(() => {
        data = {
            categories: {
                getAll() {
                    return Promise.resolve(items);
                },
            },
        };

        controller = init(app, data, config.options);
        req = require('../../../../req-res').getRequestMock();
        res = require('../../../../req-res').getResponseMock();
    });

    it('generateAllForumsView()', () => {
        return controller.generateAllForumsView(req, res)
            .then(() => {
                expect(res.options).to.be.deep.equal({
                    title: 'Forums',
                    categories: items,
                });
                expect(res.viewName).to.be.equal('forum/categories');
            });
    });
});
