/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const { setupDriver } = require('../utils/setup-driver');

describe('Items routes', () => {
    let driver = null;

    beforeEach(() => {
        driver = setupDriver('chrome');
    });

    it('check Big Test Icicles title', () => {
        return driver.get('http://localhost:3000')
            .then(() => {
                return driver.getTitle();
            })
            .then((title) => {
                console.log(title);
                expect(title).to.be.deep.equal('Big Test Icicles');
            });
    });
});
