const ReminderDAO = require('../dao/reminder');

class ReminderService {
    createReminder(reminderDto){
        const { from_user, repeat, repeat_every, start_on, end_after_x_times_occurrences } = reminderDto;
        return ReminderDAO.createReminder(from_user, repeat, repeat_every, start_on, end_after_x_times_occurrences);
    }

    getReminderByUserID(userID){
        return ReminderDAO.getReminderByUserID(userID);
    }
}

module.exports = new ReminderService();