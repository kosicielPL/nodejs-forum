const {
    expect,
} = require('chai');
const sinon = require('sinon');
const BaseData = require('../../../data/base/base.data');
describe('BaseData new instance', () => {
    const db = {
        collection: () => {},
    };

    const validator = null;
    let data = null;
    const Category = class {};
    const ModelClass = class {};
    describe('expects correct collection name', () => {
        it('when ModelClass name ends with \'y\'', () => {
            data = new BaseData(db, Category, validator);
            expect(data.collectionName).to.be.a('string', 'categories');
        });
        it('when ModelClass name does not end with \'y\'', () => {
            data = new BaseData(db, ModelClass, validator);
            expect(data.collectionName).to.be.a('string', 'modelclass');
        });
    });
});
describe('BaseData.getAll()', () => {
    const db = {
        collection: () => {},
    };

    let items = [];
    let ModelClass = null;
    let validator = null;
    let data = null;

    beforeEach(() => {
        items = [1, 2, 3];
        sinon.stub(db, 'collection')
            .callsFake(() => {
                return {
                    find: () => {
                        return {
                            toArray: () => {
                                return Promise.resolve(items);
                            },
                        };
                    },
                };
            });
        validator = {
            isValid: () => true,
        };

        ModelClass = class {};
    });
    afterEach(() => {
        db.collection.restore();
    });

    describe('when there are items in db', () => {
        it('with default viewModel', () => {
            data = new BaseData(db, ModelClass, validator);
            return data
                .getAll()
                .then((models) => {
                    expect(models).to.deep.equal(items);
                });
        });
        it('with other viewModel', () => {
            ModelClass.toViewModel = (model) => {
                return model + '1';
            };
            data = new BaseData(db, ModelClass, validator);
            return data
                .getAll()
                .then((models) => {
                    items.forEach((item) => {
                        const viewModel = item + '1';
                        expect(models).to.contain(viewModel);
                    });
                });
        });
    });
});
