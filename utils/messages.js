const moment = require('moment');

function formatMessage(username, text, fromMe) {
    return {
        username,
        text,
    }
}

module.exports = formatMessage; 