var req = require('request-promise');
var ch = require('cheerio');
var nicely = require('./scripts/output');

var sectionsPerDay = 3;

var options = {
    uri: 'http://www.surf-forecast.com/breaks/Waihi-Beach/forecasts/latest/six_day',
    transform: function (body) {
        return ch.load(body);
    }
};

var getTimeSection = function(ratingColNum) {
    var i = ratingColNum % sectionsPerDay;

    if(i == 0) {
        return 'morning';
    } else if(i == 1) {
        return 'afternoon';
    } else if(i == 2) {
        return 'night'
    }

    return 'unknown time' 
}

req(options).then(function ($) {
    $('.scrollable-forecast .cell img').each(function(i, e) {
        console.log(
            $(this)
                .parent()
                .parent()
                .parent()
                .children('tr.table-start')
                .not('.secondary_header')
                .children('td.day-end')
                .eq(Math.floor(i / sectionsPerDay))
                .html()
            + ' ('
            + getTimeSection(i)
            + ') rating: '
            + parseInt(($(this).attr('src') + '').split('.')[1])
            + '/5'
        );
    });
    
}).catch(function (err) {
    console.log(err);
});