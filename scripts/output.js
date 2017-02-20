var pretty = require('pretty');

var formatHTML = function(unformatted) {
    return pretty('' + unformatted);
}

module.exports = formatHTML;