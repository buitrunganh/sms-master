const db = require('../db/db');

setInterval( exports.remindUser = function(){
    console.log("crawling reminder from database");
    let result = db.raw('SELECT r.id as reminder_id, * from reminder r\n' +
    'join "user" u\n' +
    'on r."from_user" = u.id\n' +
    'where now() >= start_on and now() <= start_on + repeat_every * end_after_x_times_occurrences * INTERVAL \'1 day\'\n' +
    'and DATE_PART(\'day\', now() - start_on)::int % repeat_every =  0\n' +
    'and extract(HOUR from start_on) = extract(HOUR from now())\n' +
    'and extract(MINUTE from start_on) = extract(MINUTE from now())\n')
    .then(async (model) => {

        if (model.rows && model.rowCount > 0) {
            console.log('List reminder');
            console.log(model.rows);
        }
    })
    .catch(function (err) {
        return err;
    })
    return 'OK';
}, 60 * 1000);