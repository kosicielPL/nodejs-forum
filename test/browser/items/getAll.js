/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const { setupDriver } = require('../utils/setup-driver');

describe('Items routes', () => {
    let driver = null;

    beforeEach(() => {
        driver = setupDriver('chrome');
    });

    it('check telerikacademy.com title', () => {
        return driver.get('http://telerikacademy.com')
            .then(() => {
                return driver.getTitle();
            })
            .then((title) => {
                console.log(title);
                expect(title).not.to.be.undefined;
            });
    });
});
