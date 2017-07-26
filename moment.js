const moment = require('moment-timezone');
const _ = require('lodash');

// console.log(moment.tz.zone('Europe/Sofia'));
const date = new Date();

console.log(date);
console.log(moment.tz(date, 'Europe/Sofia').format('HH:mm'));

const test = moment.tz.names();

// console.log(test);

const timeZones = moment.tz.names();
timeZones.sort();

let offsetTmz = [];
let unique = [];

for (let i = 0; i < timeZones.length; i++) {
    unique.push({
        pretty: 'GTM ' + moment.tz(timeZones[i]).format('Z'),
        zone: timeZones[i],
    });
}

unique = _.sortBy(unique, (item) => {
    return item.pretty.substring(3).replace(':', '') * 1;
});

unique = _.uniqBy(unique, (item) => {
    return item.pretty;
});

// for (let i = 0; i < unique.length; i++) {
//     console.log(unique[i]);
// }
// console.log(unique.length);

// console.log(timeZones);
