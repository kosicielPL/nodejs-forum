const moment = require('moment-timezone');
const defaultTimezone = 'Europe/Sofia';

const init = (timezone) => {
    const formatter = {
        dateFormat(format, date) {
            return moment(date).tz(timezone).format(format);
        },

        prepareThreadContent(content) {
            return content
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;').replace(/>/g, '&gt;')
                .replace(/\n/g, '<br/>');
        },
    };

    return formatter;
};

module.exports = {
    init,
};
