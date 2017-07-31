/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const { setupDriver } = require('./utils/setup-driver');
const webdriver = require('selenium-webdriver');

describe('Home', () => {
    let driver = null;

    // let driver =
    //     new webdriver.Builder()
    //         .build();

    const appUrl = 'http://localhost:3000/';

    beforeEach(() => {
        driver = setupDriver('chrome');
    });

    it('check Big Test Icicles title', (done) => {
        driver.get(appUrl)
            .then(() => {
                return driver.getTitle();
            })
            .then((title) => {
                expect(title).to.be.deep.equal('Big Test Icicles');
                done();
            });
    });
    it('check if logo contains BIG, TEST and ICICLES', (done) => {
        driver.get(appUrl)
            .then(() => {
                return driver.findElement(
                    webdriver.By.className('logo-text')
                );
            })
            .then((el) => {
                return el.getText();
            })
            .then((text) => {
                expect(text).to.contain('BIG');
                expect(text).to.contain('TEST');
                expect(text).to.contain('ICICLES');
                done();
            });
    });
});
