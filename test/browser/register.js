// /* eslint-disable no-unused-expressions */
// const { expect } = require('chai');
// const { setupDriver } = require('./utils/setup-driver');
// const webdriver = require('selenium-webdriver');

// describe('Register', () => {
//     let driver = null;

//     // let driver =
//     //     new webdriver.Builder()
//     //         .build();

//     const appUrl = 'http://localhost:3000/';

//     beforeEach(() => {
//         driver = setupDriver('chrome');
//     });

//     describe('asd', () => {
//         beforeEach((done) => {
//             Promise.resolve()
//                 .then(() => driver.get(appUrl))
//                 .then(() => {
//                     return driver.findElement(
//                         webdriver.By.css('.dropdown-toggle')
//                     );
//                 })
//                 .then((btn) => {
//                     btn.click();
//                 })
//                 .then(() => {
//                     return driver.findElement(
//                         webdriver.By.css('.dropdown-menu li:last-child')
//                     );
//                 })
//                 .then((btn) => {
//                     btn.click();
//                     done();
//                 });
//         });
//             it('expect to be redirected', (done) => {
//                 const username = 'selenium';
//                 const password = '12345678';
//                 const firstname = 'Selenium';
//                 const lastname = 'Chai';
//                 const email = 'selenium@bigtesticicles.com';

//                 Promise.resolve()
//                 .then(() => driver.findElement('input[name="username"]'))
//                 .then((tb) => tb.sendKeys(username));
//                 console.log('asd');
//             });
//     });
// });

