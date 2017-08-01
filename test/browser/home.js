/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const { setupDriver } = require('./utils/setup-driver');
const webdriver = require('selenium-webdriver');
const ui = require('./utils/ui');
const async = require('../../common/async');

describe('Home', () => {
    let driver = null;

    // let driver =
    //     new webdriver.Builder()
    //         .build();

    const appUrl = 'http://localhost:3000/';

    beforeEach(() => {
        driver = setupDriver('chrome');
    });

    it('check if forum-body exists', (done) => {
        driver.get(appUrl)
            .then(() => {
                return driver.findElement(
                    webdriver.By.css('.forum-body')
                );
            })
            .then((el) => {
                expect(el).to.exist;
                done();
            });
    });

    it('check if sidenav exists', (done) => {
        driver.get(appUrl)
            .then(() => {
                return driver.findElement(
                    webdriver.By.css('.row.sidenav')
                );
            })
            .then((el) => {
                expect(el).to.exist;
                done();
            });
    });

    it('check if footer exists', (done) => {
        driver.get(appUrl)
            .then(() => {
                return driver.findElement(
                    webdriver.By.css('.forum-footer')
                );
            })
            .then((el) => {
                expect(el).to.exist;
                done();
            });
    });
});
