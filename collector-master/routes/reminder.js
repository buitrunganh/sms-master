const express = require('express');
const reminderController = require('../controller/reminder');

const router = express.Router();

// create new reminder
router.post('/reminder/create', reminderController.createReminder);

router.route('/reminder/:userID').get(reminderController.getReminderByUserID);

// list all reminder for a user ? 

// list all reminders
module.exports = router;