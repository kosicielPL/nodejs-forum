const moment = require('moment-timezone');
const defaultTimezone = 'Europe/Sofia';

const init = (timezone) => {
    if (!timezone) {
        timezone = defaultTimezone;
    }
    const formatter = {
        dateFormat(format, date) {
            return moment(date).tz(timezone).format(format);
        },

        relativeTime(date) {
            const now = moment().tz(timezone);
            const then = moment(date).tz(timezone);
            const difference = moment.duration(now.diff(then));
            if (difference.years() > 0) {
                return then.tz(timezone).format('MMM DD YYYY');
            } else if (difference.days() > 0) {
                return then.tz(timezone).format('MMM DD');
            }

            return moment(date).fromNow();
        },

        prepareThreadContent(content) {
            return content
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;').replace(/>/g, '&gt;')
                .replace(/\n/g, '<br/>');
        },

        shortenThreadContent(content, symbolsCount) {
            if (content.length > symbolsCount) {
                content = content.substring(0, symbolsCount) + '...';
            }

            return content;
        },
    };

    return formatter;
};

module.exports = {
    init,
};
