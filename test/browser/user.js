/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const { setupDriver } = require('./utils/setup-driver');
const ui = require('./utils/ui');
const loginUtils = require('./utils/login.utils');
const registerUtils = require('./utils/register.utils');
const async = require('../../common/async');

describe('In Profile page', () => {
    let driver = null;
    const appUrl = 'http://localhost:3000';
    const firstName = 'Selenium';
    const lastName = 'Chai';
    const username = 'Selenium';
    const email = 'selenium@bigtesticicles.com';
    const password = '12345678';


    before(() => {
        async()
            .then(() => {
                return registerUtils
                    .register(username, email, firstName, lastName, password);
            });
    });

    beforeEach(() => {
        driver = setupDriver('chrome');
        ui.setDriver(driver);
        return driver.get(appUrl);
    });

    afterEach(() => {
        // driver.quit();
    });

    describe('when the page is loaded', () => {
        beforeEach(() => {
            async()
                .then(() => {
                    return loginUtils.login(username, password);
                });
        });

        it('expect BIG TEST ICICLES BABY', () => {
            return async()
                .then(() => ui.getText('.logo-text'))
                .then((titleText) => {
                    expect(titleText).to.contain('BIG');
                    expect(titleText).to.contain('TEST');
                    expect(titleText).to.contain('ICICLES');
                    expect(titleText).to.contain('BABY');
                });
        });


        // it('expect a button for log out to be visible', () => {
        //     return async()
        //         .then(() => ui.click('.dropdown-toggle'))
        //         .then(() => ui.getText('.dropdown-menu li:last-child'))
        //         .then((btnText) => {
        //             expect(btnText).to.contain('Log out');
        //         });
        // });

        // it('expect search to be accessible', () => {
        //     return async()
        //         .then(() => ui.click('li.hidden-xs::nth-child(3)'))
        //         .then(() => ui.setValue('input[name="search"]', 'username'))
        //         .then(() => ui.getText('.search-input'))
        //         .then((searchText) => {
        //             expect(searchText).to.contain('username');
        //         });
        // });
    });
});
