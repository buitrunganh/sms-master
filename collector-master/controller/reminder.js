const reminderService = require('../service/reminder');

class ReminderController {
    async createReminder(req, res) {
        try {
            const id = await reminderService.createReminder(req.body);
            res.status(201).json(id);
        } catch (err) {
            console.error(err);
            res.status(500).json(err)
        }
    }

    async getReminderByUserID(req, res) {
        try {
            console.log(req.params.userID);
            const reminder = await reminderService.getReminderByUserID(req.params.userID);
            console.log(reminder);
            res.status(201).json(reminder);
        } catch (err) {
            console.error(err);
            res.status(500).json(err)
        }
    }
}

module.exports = new ReminderController();