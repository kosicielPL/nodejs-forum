const {
    expect,
} = require('chai');
const {
    init,
} = require('../../../../../../server/app/routers/home.router/controller');
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
            forums: {
                getAdminContent(count) {
                    return Promise.resolve(items);
                },
            },
        };

        controller = init(app, data, config.options);
        req = require('../../../../req-res').getRequestMock();
        res = require('../../../../req-res').getResponseMock();
    });

    it('expects to get result', () => {
        return controller.generateHomeView(req, res)
            .then(() => {
                expect(res.options).to.be.deep.equal({
                    title: 'Big Test Icicles',
                    forums: items,
                });
                expect(res.viewName).to.be.equal('home');
            });
    });
});
