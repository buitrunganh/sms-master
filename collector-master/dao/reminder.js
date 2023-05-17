const db = require('../db/db');

class ReminderDAO {
    async createReminder(from_user, repeat, repeat_every, start_on, end_after_x_times_occurrences) {
        const [id] = await db('reminder').insert({
            from_user: from_user,
            repeat: repeat,
            repeat_every: repeat_every,
            start_on: start_on,
            end_after_x_times_occurrences: end_after_x_times_occurrences
        }).returning('id');

        return id;
    }

    async getReminderByUserID(userID) {
        console.log('userID:' + userID);
        const reminder = await db.raw(
            'select * from reminder\n' +
            'where from_user =' + userID)
        .then((reminder)=>{
            console.log('return value: ' + reminder.rows);
            return reminder.rows;
        })

        return reminder;
    }
}

module.exports = new ReminderDAO();