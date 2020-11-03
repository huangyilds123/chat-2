const moment = require('moment');

function formatMessage(username, text, time) {
    return {
        username,
        text,
    }
}

module.exports = formatMessage; 